/* Firebase (client SDK only). Web config values are NOT secrets — security comes from firestore.rules.
   Paste your values from Firebase Console → Project settings → Your apps → Web app.
   Never put Admin SDK / service-account credentials in this file. */
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getFirestore, collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "", authDomain: "", projectId: "", storageBucket: "", messagingSenderId: "", appId: ""
};

const configured = Boolean(firebaseConfig.apiKey && firebaseConfig.projectId && firebaseConfig.appId);
let db = null;
if (configured) { try { db = getFirestore(initializeApp(firebaseConfig)); } catch (e) { console.error("Firebase init failed", e); } }

window.firebaseStore = {
  configured: configured && !!db,
  async save(name, data) {
    if (!db) throw new Error("Firebase is not configured");
    return addDoc(collection(db, name), { ...data, createdAt: serverTimestamp() });
  }
};
