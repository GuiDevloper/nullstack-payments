import { loadStripe, Stripe } from '@stripe/stripe-js'
import { NullstackServerContext } from 'nullstack'
export { ROUTES } from './enums'

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
async function getStripe(stripePublicKey: string) {
  if (!loadedStripe) {
    loadedStripe = await loadStripe(stripePublicKey)
  }
  return loadedStripe
}

export { getCurrentDomain, getStripe }
