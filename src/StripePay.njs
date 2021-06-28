import Nullstack from 'nullstack';
import './StripePay.scss';
import Stripe from 'stripe';
import { loadStripe } from "@stripe/stripe-js";
let stripePromise = null;

class StripePay extends Nullstack {

  message = '';

  static async start({ secrets, server, project }) {
    const stripe = new Stripe(secrets.stripeSecret);
    server.post('/create-checkout-session', async (_req, res) => {
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [
          {
            price_data: {
              currency: 'brl',
              product_data: {
                name: 'Support GuiDevloper Developments',
                images: ['https://avatars.githubusercontent.com/u/31557312'],
              },
              unit_amount: 100,
            },
            adjustable_quantity: {
              enabled: true,
              minimum: 1,
              maximum: 99
            },
            quantity: 1,
          },
        ],
        mode: 'payment',
        success_url: `http://${project.domain}:5000?success=true`,
        cancel_url: `http://${project.domain}:5000?canceled=true`,
      });
      res.json({ id: session.id });
    });
  }

  async hydrate({ settings }) {
    stripePromise = await loadStripe(settings.stripePublic);
  }

  renderProductDisplay({ handleClick }) {
    return (
      <section>
        <div class="product">
          <img
            src="https://avatars.githubusercontent.com/u/31557312?s=60"
            alt="GuiDevloper picture"
          />
          <div class="description">
            <h3>Support GuiDevloper Developments</h3>
            <h5>R$1,00</h5>
          </div>
        </div>
        <button
          type="button" class="checkout-button" role="link"
          onclick={handleClick}
        >
          Checkout
        </button>
      </section>
    );
  }

  clearMessage({ router }) {
    router.url = '/';
    this.message = '';
  }

  renderMessage({ message }) {
    return (
      <section>
        <p>{message}</p>
        <button
          type="button" class="checkout-button" role="link"
          onclick={this.clearMessage}
        >
          Continue
        </button>
      </section>
    );
  }

  async handleClick(context) {
    context.loading = true;
    const response = await fetch("/create-checkout-session", {
      method: "POST",
    });

    const session = await response.json();

    // When the customer clicks on the button, redirect them to Checkout.
    const result = await stripePromise.redirectToCheckout({
      sessionId: session.id,
    });
    context.loading = false;

    if (result.error) {
      console.log(result.error.message);
    }
  }

  render({ params }) {
    if (params.success) {
      this.message = ("Order placed! You will receive an email confirmation.");
    }
    if (params.canceled) {
      this.message = ("Order canceled, continue to the start.");
    }

    return (
      <div>
        {this.message ? (
          <Message message={this.message} />
        ) : (
          <ProductDisplay handleClick={this.handleClick} />
        )}
      </div>
    )
  }

}

export default StripePay;