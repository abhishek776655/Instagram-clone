import Firebase from "firebase";
import "firebase/firestore";
import "firebase/auth";

// import { seedDatabase } from "../seed";
const config = {
  apiKey: "AIzaSyAUjvN9dbTgKE8y_rIel_PbwBlkdwTSnYI",
  authDomain: "instagram-6c633.firebaseapp.com",
  projectId: "instagram-6c633",
  storageBucket: "instagram-6c633.appspot.com",
  messagingSenderId: "190061376206",
  appId: "1:190061376206:web:d397674b4a340ba6a9d69f",
};

const firebase = Firebase.initializeApp(config);
const { FieldValue } = Firebase.firestore;
// seedDatabase(firebase);
export { firebase, FieldValue };
