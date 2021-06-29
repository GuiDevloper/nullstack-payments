import Nullstack from 'nullstack';
import './StripeElements.scss';
import Stripe from 'stripe';
import { loadStripe } from "@stripe/stripe-js";
let stripePromise = null;

class StripeElements extends Nullstack {

  card = null;
  cardError = '';
  disabledSubmit = true;
  showResult = false;
  paymentId = '';

  async hydrate({ settings }) {
    stripePromise = await loadStripe(settings.stripePublic);
    var elements = stripePromise.elements();
    var style = {
      base: {
        color: "#32325d",
        fontFamily: 'Roboto, Arial, sans-serif',
        fontSmoothing: "antialiased",
        fontSize: "16px",
        "::placeholder": {
          color: "#8c8cbc"
        }
      },
      invalid: {
        fontFamily: 'Roboto, Arial, sans-serif',
        color: "#fa755a",
        iconColor: "#fa755a"
      }
    };
    var card = elements.create("card", { style });
    // Stripe injects an iframe into the DOM
    card.mount("#card-element");
    card.on("change", (event) => {
      // Disable the Pay button if there are no card details in the Element
      this.disabledSubmit = event.empty;
      this.cardError = event.error ? event.error.message : "";
    });
    this.card = card;
  }

  // Shows a success message when the payment is complete
  orderComplete({ paymentIntentId }) {
    this.paymentId = paymentIntentId;
    this.showResult = true;
    this.disabledSubmit = true;
  };

  // Show the customer the error from Stripe if their card fails to charge
  showError({ errorMessage }) {
    this.cardError = errorMessage;
    setTimeout(() => {
      this.cardError = '';
    }, 4000);
  }

  static async getPaymentIntentId({ secrets }) {
    const stripe = new Stripe(secrets.stripeSecret);
    // Create a PaymentIntent with the order amount and currency
    const paymentIntent = await stripe.paymentIntents.create({
      amount: 100,
      currency: "brl"
    });
    return paymentIntent.client_secret;
  }

  // Calls stripe.confirmCardPayment
  // If the card requires authentication Stripe shows a pop-up modal to
  // prompt the user to enter authentication details without leaving your page.
  async onSubmit(context) {
    context.loading = true;
    const paymentIntentId = await this.getPaymentIntentId();
    const result = await stripePromise
      .confirmCardPayment(paymentIntentId, {
        payment_method: {
          card: this.card
        }
      });
    context.loading = false;
    if (result.error) {
      // Show error to your customer
      this.showError({ errorMessage: result.error.message });
    } else {
      // The payment succeeded!
      this.orderComplete({ paymentIntentId: result.paymentIntent.id });
    }
  }

  renderResultMessage() {
    const paymentUrl = this.paymentId
      ? `https://dashboard.stripe.com/test/payments/${this.paymentId}`
      : '';

    return (
      <>
        {this.showResult && (
          <p class="result-message">
            Pagamento realizado!
            <a href={paymentUrl}>Veja aqui</a>
          </p>
        )}
      </>
    );
  }

  render() {
    return (
      <form class="stripe-elements" onsubmit={this.onSubmit}>
        <div id="card-element"></div>
        <button type="submit" disabled={this.disabledSubmit}>
          Pagar agora
        </button>
        <p class="card-error" role="alert">
          {this.cardError}
        </p>
        <ResultMessage />
      </form>
    )
  }

}

export default StripeElements;