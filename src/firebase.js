import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDH1f0OqxZGxGoKGhcMrV-RvQm5DYRnUmw",
  authDomain: "kreatix-test.firebaseapp.com",
  projectId: "kreatix-test",
  storageBucket: "kreatix-test.appspot.com",
  messagingSenderId: "160814783581",
  appId: "1:160814783581:web:da217fd48ebdf2ec2141b4",
  measurementId: "G-490K1NEJQQ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
