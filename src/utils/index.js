import Links from './Links';
import Loader from './Loader';
import { loadStripe } from "@stripe/stripe-js";

function getCurrentDomain({ environment, project }) {
  if (environment.development) {
    return `http://${project.domain}:5000`;
  } else {
    return `https://${project.domain}`;
  }
}

const ROUTES = [
  { name: 'Stripe Checkout', url: '/stripe-checkout' },
  { name: 'Stripe Elements', url: '/stripe-elements' }
];

// Update with your public key
const STRIPE_KEY = "pk_test_51J6LGjGVLsmwBvfdgiYUGqm4XgklBmbV26FlxTI8HG0Ndi0g3Yu9Kjy8w3IeioRFjb8OTYq6naYjTvAoeZiNphwD005HTNhVkM";

let loadedStripe = null;
async function getStripe() {
  if (!loadedStripe) {
    loadedStripe = await loadStripe(STRIPE_KEY);
  }
  return loadedStripe;
}

export {
  Links,
  Loader,
  getCurrentDomain,
  ROUTES,
  getStripe
};