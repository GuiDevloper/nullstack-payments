import Links from './Links'
import Loader from './Loader'
import { loadStripe } from '@stripe/stripe-js'
import { ROUTES, STRIPE_KEY } from './enums'

function getCurrentDomain({ environment, project }) {
  if (environment.development) {
    return `http://${project.domain}:5000`
  } else {
    return `https://${project.domain}`
  }
}

let loadedStripe = null
async function getStripe() {
  if (!loadedStripe) {
    loadedStripe = await loadStripe(STRIPE_KEY)
  }
  return loadedStripe
}

export { Links, Loader, getCurrentDomain, ROUTES, getStripe }
