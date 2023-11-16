// frontend.js

let accessToken;
const keycloak = Keycloak({
  url: 'http://localhost:8080',
  realm: 'master',
  clientId: 'frontend',
  redirectUri: 'https://lujainsallam1.github.io/saml/',
  enableDebug: true,
});

// Initialize Keycloak
keycloak
  .init({ onLoad: 'check-sso' })
  .then((authenticated) => {
    if (authenticated) {
      // Keycloak is initialized successfully
      accessToken = keycloak.token;
      console.log(`Access Token: ${accessToken}`);

      // Check if the user has the "admin" role
      const tokenParsed = keycloak.tokenParsed;
      const roles = tokenParsed.realm_access.roles;

      if (roles.includes('admin')) {
        console.log("User has 'admin' role");
        // Now you can open the protected page
        openProtectedPage();
      } else {
        alert("User does not have admin role. Access denied.");
        logoutAndRedirect();
      }
    } else {
      // User is not authenticated, redirect to login page
      redirectToLoginPage();
    }
  })
  .catch(() => {
    // Keycloak failed to initialize, show an alert and redirect to error page
    alert("Could not authenticate the user! Keycloak is not available.");
    logoutAndRedirect();
  });

// Function to open the protected page
function openProtectedPage() {
  // Here, you can navigate to the protected page or perform any actions needed.
  console.log("Opening the protected page...");
  // For example, redirect to another URL
  window.location.href = 'https://lujainsallam1.github.io/saml/';
}

// Function to logout and redirect to login page
function logoutAndRedirect() {
  const clientId = 'frontend';
  const postLogoutRedirect = 'https://lujainsallam1.github.io/saml/';
  window.location.href = http://localhost:8080/realms/master/protocol/openid-connect/logout?post_logout_redirect_uri=${postLogoutRedirect}&client_id=${clientId};
}

// Function to redirect to login page
function redirectToLoginPage() {
  const loginPage = 'https://lujainsallam1.github.io/saml/login.html'; // Specify your login page URL
  window.location.href = loginPage;
}
