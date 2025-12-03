import StripeCheckout from '~/pages/StripeCheckout'
import StripeElements from '~/pages/StripeElements'

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
