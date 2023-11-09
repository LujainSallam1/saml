const keycloak = Keycloak({
    url: 'http://localhost:8080',
    realm: 'master',
    clientId: 'frontend',
    redirectUri: 'https://lujainsallam1.github.io/saml',
       enableDebug: true,
    
  });
  
  document.getElementById('login').addEventListener('click', () => {
    keycloak.login();
  });
  
  document.getElementById('logout').addEventListener('click', () => {
      const idToken = keycloak.token;
     const postLogoutRedirect = 'https://lujainsallam1.github.io/saml';
     const logoutURL = keycloak.createLogoutUrl({
        id_token_hint: idToken, // إرسال ID Token كمعلمة
        post_logout_redirect_uri: postLogoutRedirect,
     });
     window.location.href = logoutUrl;
  });
  
  keycloak
    .init({ onLoad: 'login-required' })
    .then((authenticated) => {
      if (authenticated) {
        const accessToken = keycloak.token;
        console.log(`Access Token: ${accessToken}`);
  
        // Check if the user has the "admin" role
       const tokenParsed = keycloak.tokenParsed;
        const roles = tokenParsed.realm_access.roles;
  

        if (roles.includes("admin")) {
          console.log("User has 'admin' role");
        } else {
          alert("User does not have admin role. Access denied.");
          keycloak.logout();
                     console.log(`idToken: ${idToken}`);
        console.log(`postLogoutRedirect: ${postLogoutRedirect}`);
        }
        console.log("Access Token:", keycloak.token);

      }
   else {
        alert("User authentication failed!");
       
      }
    })
    .catch(() => {
      alert("Could not authenticate the user!");
    });
  
