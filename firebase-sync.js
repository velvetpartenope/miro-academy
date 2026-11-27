import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getFirestore, doc, getDoc, setDoc } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBoJqML1hGittELSfxq0_XJwidBpqauREg",
  authDomain: "miro-academy-76db7.firebaseapp.com",
  projectId: "miro-academy-76db7",
  storageBucket: "miro-academy-76db7.firebasestorage.app",
  messagingSenderId: "119691547879",
  appId: "1:119691547879:web:6a8ef60a73481799f03e42"
};

const app = initializeApp(firebaseConfig);
const cloudDb = getFirestore(app);
const stateDocRef = doc(cloudDb, "miro_academy", "main_state");

window.pushToCloud = async function (currentDb) {
  try {
    await setDoc(stateDocRef, {
      payload: JSON.stringify(currentDb),
      updatedAt: new Date().toISOString()
    });
  } catch (err) {
    console.warn("Errore salvataggio cloud:", err);
  }
};

window.pullFromCloud = async function () {
  try {
    const snap = await getDoc(stateDocRef);
    if (snap.exists() && snap.data().payload) {
      return JSON.parse(snap.data().payload);
    }
  } catch (err) {
    console.warn("Errore lettura cloud:", err);
  }
  return null;
};
