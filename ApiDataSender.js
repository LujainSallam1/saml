const redirectUriInput = document.getElementById("redirectUri");
const SamlExtendedInput = document.getElementById("SamlExtended");
const buttonInput = document.getElementById("submit");
const Display_Name_input = document.getElementById("displayName");
const Display_Order_input = document.getElementById("displayOrder");
const Service_Provider_Entity_ID_input = document.getElementById("spEntityId");
const Identity_Provider_Entity_ID_input = document.getElementById("idpEntityId");
const Single_Sign_On_Service_URL_input = document.getElementById("ssoServiceUrl");
const Single_Logout_Service_URL_input = document.getElementById("sloServiceUrl");
const allowedClockSkew_input = document.getElementById("allowedClockSkew");
const attributeConsumingServiceIndex_input = document.getElementById("attributeConsumingServiceIndex");
const attributeConsumingServiceName_input = document.getElementById("attributeConsumingServiceName");
const authnContextClassRefs_input = document.getElementById("authnContextClassRefs");
const authnContextDeclRefs_input = document.getElementById("authnContextDeclRefs");
const comparison_input = document.getElementById("comparison");
const firstLoginFlow_input = document.getElementById("firstLoginFlow");
const postLoginFlow_input = document.getElementById("postLoginFlow");
const syncMode_input = document.getElementById("syncMode");
const principalType_input = document.getElementById("principalType");
const nameIdPolicy_input = document.getElementById("nameIdPolicy");
const SignatureAlgorithm_input=document.getElementById("SignatureAlgorithm");
const SAMLSignatureKeyName_input=document.getElementById("SAMLSignatureKeyName");
const ValidatingX509Certificates_input=document.getElementById("ValidatingX509Certificates");

buttonInput.addEventListener('click', () => {
    
  
    const authnContextClassRefs=[]
    const ClassRefs_inputs= ClassRefs_items.querySelectorAll("input");
    ClassRefs_inputs.forEach(input =>{authnContextClassRefs.push(input.value)});
    console.log(authnContextClassRefs);
    const authnContextDeclRefs=[]
    const DeclRefs_inputs = DeclRefs_items.querySelectorAll("input");
    DeclRefs_inputs.forEach(input =>{authnContextDeclRefs.push(input.value)});
    console.log(authnContextClassRefs);
    const redirectUri = redirectUriInput.value;
    const SamlExtended = SamlExtendedInput.value;
    const button = buttonInput.value;
    const Display_Name = Display_Name_input.value;
    const Display_Order = Display_Order_input.value;
    const Service_Provider_Entity_ID = Service_Provider_Entity_ID_input.value;
    const Identity_Provider_Entity_ID = Identity_Provider_Entity_ID_input.value;
    const Single_Sign_On_Service_URL = Single_Sign_On_Service_URL_input.value;
    const Single_Logout_Service_URL = Single_Logout_Service_URL_input.value;
    const allowedClockSkew = allowedClockSkew_input.value;
    const attributeConsumingServiceIndex = attributeConsumingServiceIndex_input.value;
    const attributeConsumingServiceName = attributeConsumingServiceName_input.value;
    var comparison = comparison_input.value;
    var firstLoginFlow = firstLoginFlow_input.value;
    var postLoginFlow = postLoginFlow_input.value;
    var syncMode = syncMode_input.value;
    var principalType = principalType_input.value;
    var nameIdPolicy = nameIdPolicy_input.value;
    var nameIdPolicy1=`urn:oasis:names:tc:SAML:1.1:nameid-format:${nameIdPolicy}`;
    var SignatureAlgorithm=SignatureAlgorithm_input.value;
    var SAMLSignatureKeyName=SAMLSignatureKeyName_input.value;
    const  ValidatingX509Certificates= ValidatingX509Certificates_input.value;
    const url = `http://localhost:8080/admin/realms/master/identity-provider/instances`;

   const data = {
        "alias": SamlExtended,
        "displayName": Display_Name,
        "internalId": "a3e9b939-357f-4bff-bac6-8225aec4a9e4",
        "providerId": "saml-extended",
        "enabled": true,
        "updateProfileFirstLoginMode": "on",
        "trustEmail": trustEmail_value,
        "storeToken": storeToken_value,
        "addReadTokenRoleOnCreate": storedTokensReadable_value,
        "authenticateByDefault": false,
        "linkOnly": accountLinkingOnly_value,
        "firstBrokerLoginFlowAlias": firstLoginFlow,
        "postBrokerLoginFlowAlias": postLoginFlow,
        config: {
            "postBindingLogout": httpPostBindingLogout_value,
            "authnContextClassRefs": authnContextClassRefs,
            "postBindingResponse": httpPostBindingResponse_value,
            "singleLogoutServiceUrl": Single_Logout_Service_URL,
            "authnContextDeclRefs": authnContextDeclRefs,
            "backchannelSupported": backchannel_value,
            "xmlSigKeyInfoKeyNameTransformer":SAMLSignatureKeyName,
            "idpEntityId": Identity_Provider_Entity_ID,
            "loginHint": passSubject_value,
            "allowCreate": allowCreat_value,
            "authnContextComparisonType": comparison,
            "syncMode": syncMode,
            "singleSignOnServiceUrl": Single_Sign_On_Service_URL,
            "wantAuthnRequestsSigned": "true",
            "allowedClockSkew": allowedClockSkew,
            "guiOrder": Display_Order,
            "validateSignature":validateSignatures_value,
            "hideOnLoginPage": hideLoginPage_value,
            "signingCertificate":ValidatingX509Certificates,
            "nameIDPolicyFormat": nameIdPolicy1,
            "entityId": Service_Provider_Entity_ID,
            "attributeConsumingServiceName": attributeConsumingServiceName,
            "signSpMetadata": signMetadata_value,
            "wantAssertionsEncrypted": wantAssertionsEncrypted_value,
            "signatureAlgorithm":SignatureAlgorithm,
            "wantAssertionsSigned": wantAssertionsSigned_value,
            "postBindingAuthnRequest":wantAuthnRequestsSigned_value,
            "forceAuthn": forceAuthentication_value,
            "attributeConsumingServiceIndex": attributeConsumingServiceIndex,
            "principalType": principalType,
        }
    };
    
    for (const key in data) {
        if (!data[key]) {
            delete data[key];
        }
    }

    // التحقق من قيمة الحقول
    for (const key in data) {
        if (typeof data[key] === 'string' && !data[key].trim() === "") {
          delete data[key];
        }
    }
    console.log(data);

    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
             'Authorization': `Bearer ${accessToken}`
        },
        body: JSON.stringify(data)
    })
        .then(response => response.json())
        .then(data => {
            `displayData.textContent = Data received: ${JSON.stringify(data)}`;
              console.log(`Bearer ${accessToken}`)
        })
        .catch(error => {
            console.error('error', error);
        });
        document.getElementById("ValidatingX509Certificates").value='';
});

