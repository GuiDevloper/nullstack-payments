export function getCurrentDomain({ environment, project }) {
  if (environment.development) {
    return `http://${project.domain}:5000`;
  } else {
    return `https://${project.domain}`;
  }
}