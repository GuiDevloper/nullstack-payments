import Links from './Links'
import Loader from './Loader'
import { loadStripe, Stripe } from '@stripe/stripe-js'
import { ROUTES, STRIPE_KEY } from './enums'
import { NullstackServerContext } from 'nullstack'

function getCurrentDomain({
  environment,
  project,
  server
}: NullstackServerContext) {
  if (environment.development) {
    return `http://${project.domain}:${server.port}`
  } else {
    return `https://${project.domain}`
  }
}

let loadedStripe: Stripe | null = null
async function getStripe() {
  if (!loadedStripe) {
    loadedStripe = await loadStripe(STRIPE_KEY)
  }
  return loadedStripe
}

export { Links, Loader, getCurrentDomain, ROUTES, getStripe }
