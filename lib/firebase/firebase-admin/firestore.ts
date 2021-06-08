import admin, { ServiceAccount } from "firebase-admin";
console.log("??? ", process.env.SERVICE_ACCOUNT_PRIVATE_KEY);
const serviceAccount =
  process.env.NODE_ENV === "production"
    ? {
        type: process.env.NEXT_PUBLIC_SERVICE_ACCOUNT_TYPE,
        project_id: process.env.NEXT_PUBLIC_SERVICE_ACCOUNT_PROJECT_ID,
        private_key_id: process.env.NEXT_PUBLIC_SERVICE_ACCOUNT_PRIVATE_KEY_ID,
        private_key: (process.env
          .SERVICE_ACCOUNT_PRIVATE_KEY as string).replace(/\\n/g, "\n"),
        client_email: process.env.NEXT_PUBLIC_SERVICE_ACCOUNT_CLIENT_EMAIL,
        client_id: process.env.NEXT_PUBLIC_SERVICE_ACCOUNT_CLIENT_ID,
        auth_uri: process.env.NEXT_PUBLIC_SERVICE_ACCOUNT_AUTH_URI,
        token_uri: process.env.NEXT_PUBLIC_SERVICE_ACCOUNT_TOKEN_URI,
        auth_provider_x509_cert_url:
          process.env.NEXT_PUBLIC_SERVICE_ACCOUNT_AUTH_PROVIDER_X509_CERT_URL,
        client_x509_cert_url:
          process.env.NEXT_PUBLIC_SERVICE_ACCOUNT_CLIENT_X509_CERT_URL
      }
    : {
        type: process.env.SERVICE_ACCOUNT_TYPE,
        project_id: process.env.SERVICE_ACCOUNT_PROJECT_ID,
        private_key_id: process.env.SERVICE_ACCOUNT_PRIVATE_KEY_ID,
        private_key: (process.env
          .SERVICE_ACCOUNT_PRIVATE_KEY as string).replace(/\\n/g, "\n"),
        client_email: process.env.SERVICE_ACCOUNT_CLIENT_EMAIL,
        client_id: process.env.SERVICE_ACCOUNT_CLIENT_ID,
        auth_uri: process.env.SERVICE_ACCOUNT_AUTH_URI,
        token_uri: process.env.SERVICE_ACCOUNT_TOKEN_URI,
        auth_provider_x509_cert_url:
          process.env.SERVICE_ACCOUNT_AUTH_PROVIDER_X509_CERT_URL,
        client_x509_cert_url: process.env.SERVICE_ACCOUNT_CLIENT_X509_CERT_URL
      };

if (!admin.apps.length) {
  try {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount as ServiceAccount)
    });
  } catch (error) {
    console.log("Firebase admin initialization error", error.stack);
  }
}

export default admin.firestore();
