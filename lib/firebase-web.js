const FIREBASE_APP_COMPAT = 'https://www.gstatic.com/firebasejs/10.14.1/firebase-app-compat.js';
const FIREBASE_AUTH_COMPAT = 'https://www.gstatic.com/firebasejs/10.14.1/firebase-auth-compat.js';

function getEnvConfig() {
  const config = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  };

  if (!config.apiKey || !config.authDomain || !config.projectId || !config.appId || !config.messagingSenderId) {
    throw new Error('Missing Firebase web configuration. Set NEXT_PUBLIC_FIREBASE_API_KEY, NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN, NEXT_PUBLIC_FIREBASE_PROJECT_ID, NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID, and NEXT_PUBLIC_FIREBASE_APP_ID in .env.local.');
  }

  return config;
}

function loadScript(src) {
  return new Promise((resolve, reject) => {
    if (document.querySelector(`script[src="${src}"]`)) {
      resolve();
      return;
    }

    const script = document.createElement('script');
    script.src = src;
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error(`Failed to load Firebase script: ${src}`));
    document.head.appendChild(script);
  });
}

async function getFirebase() {
  if (typeof window === 'undefined') {
    throw new Error('Firebase auth can only run in the browser.');
  }

  await loadScript(FIREBASE_APP_COMPAT);
  await loadScript(FIREBASE_AUTH_COMPAT);

  const firebase = window.firebase;
  if (!firebase) {
    throw new Error('Firebase SDK failed to initialize.');
  }

  if (!firebase.apps.length) {
    firebase.initializeApp(getEnvConfig());
  }

  return firebase;
}

export async function getFirebaseAuth() {
  const firebase = await getFirebase();
  return firebase.auth();
}

async function createRecaptchaVerifier(auth, containerId) {
  const firebase = await getFirebase();

  if (window.ecRecaptchaVerifier) {
    window.ecRecaptchaVerifier.clear();
  }

  window.ecRecaptchaVerifier = new firebase.auth.RecaptchaVerifier(
    containerId,
    {
      size: 'invisible',
    },
    auth
  );

  await window.ecRecaptchaVerifier.render();
  return window.ecRecaptchaVerifier;
}

export async function sendFirebaseOtp(phoneE164, recaptchaContainerId = 'recaptcha-container') {
  const auth = await getFirebaseAuth();
  const recaptchaVerifier = await createRecaptchaVerifier(auth, recaptchaContainerId);

  let confirmation;
  try {
    confirmation = await auth.signInWithPhoneNumber(phoneE164, recaptchaVerifier);
  } catch (error) {
    const code = error?.code || '';
    if (code.includes('invalid-api-key')) {
      throw new Error('Firebase API key is invalid. Check NEXT_PUBLIC_FIREBASE_API_KEY and ensure the project is correct.');
    }
    if (code.includes('app-not-authorized')) {
      throw new Error('Current domain is not authorized in Firebase Auth. Add this domain in Firebase Authentication settings.');
    }
    throw error;
  }
  sessionStorage.setItem('ec_phone_tmp', phoneE164);
  sessionStorage.setItem('ec_verification_id', confirmation.verificationId);

  return confirmation;
}

export async function verifyFirebaseOtp(code) {
  const firebase = await getFirebase();
  const auth = await getFirebaseAuth();
  const verificationId = sessionStorage.getItem('ec_verification_id');

  if (!verificationId) {
    throw new Error('OTP session expired. Please request a new code.');
  }

  const credential = firebase.auth.PhoneAuthProvider.credential(verificationId, code);
  const userCredential = await auth.signInWithCredential(credential);
  const idToken = await userCredential.user.getIdToken();

  return {
    idToken,
    phone: sessionStorage.getItem('ec_phone_tmp') || '',
  };
}
