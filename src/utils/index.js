import Links from './Links';
import Loader from './Loader';

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

export {
  Links,
  Loader,
  getCurrentDomain,
  ROUTES
};