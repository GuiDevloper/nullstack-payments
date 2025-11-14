import Nullstack from 'nullstack';
import './StripeCheckout.scss';
import Stripe from 'stripe';
import { getCurrentDomain, getStripe } from './utils';

class StripePay extends Nullstack {

  message = '';

  static async getCheckoutSession(context) {
    const currentDomain = `${getCurrentDomain(context)}/stripe-checkout`;
    const stripe = new Stripe(context.secrets.stripe, { apiVersion: '2020-08-27' });
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
      success_url: `${currentDomain}?success=true`,
      cancel_url: `${currentDomain}?canceled=true`,
    });
    return session.id;
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
          type="button" class="stripe-button" role="link"
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
          type="button" class="stripe-button" role="link"
          onclick={this.clearMessage}
        >
          Continue
        </button>
      </section>
    );
  }

  async handleClick() {
    const sessionId = await this.getCheckoutSession();

    // When the customer clicks on the button, redirect them to Checkout.
    const result = await (await getStripe()).redirectToCheckout({
      sessionId: sessionId,
    });

    if (result.error) {
      this.message = result.error.message;
    }
  }

  render({ params }) {
    if (params.success) {
      this.message = "Order placed! You will receive an email confirmation.";
    }
    if (params.canceled) {
      this.message = "Order canceled, continue to the start.";
    }

    return (
      <div class="stripe-checkout">
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