import StripeCheckout from '../StripeCheckout'
import StripeElements from '../StripeElements'

export const ROUTES = [
  {
    name: 'Stripe Checkout',
    url: '/stripe-checkout',
    Component: StripeCheckout
  },
  {
    name: 'Stripe Elements',
    url: '/stripe-elements',
    Component: StripeElements
  }
]
