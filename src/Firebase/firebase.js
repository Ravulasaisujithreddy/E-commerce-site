// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth,createUserWithEmailAndPassword,signInWithEmailAndPassword,signOut} from "firebase/auth";
import { collection,addDoc,getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAAYUh3Tv4fmaYY68v8pFzl5PXoYSy9wls",
  authDomain: "e-commerce-site-c665b.firebaseapp.com",
  projectId: "e-commerce-site-c665b",
  storageBucket: "e-commerce-site-c665b.appspot.com",
  messagingSenderId: "109333598665",
  appId: "1:109333598665:web:49ce99e9ce6a9daf101818",
  measurementId: "G-L8S8SSE7K6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth= getAuth(app);
const db=getFirestore(app);

const signup = async (name, email, password) => {
    try {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        const user = res.user;

        await addDoc(collection(db, "users"), {  // Assuming 'users' collection
            uid: user.uid,
            name: name,  // Storing the user's name
            authProvider: "local",
            email: email,
        });

        return user;  // Optional: return user data if needed
    } catch (error) {
        console.error("Signup Error: ", error.code);  // Improved error logging
        return error.code
    }
};


const login = async (email, password) => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        return userCredential; // returns user credentials after successful sign-in
    } catch (error) {
        console.error("Login Error: ", error.message); // log error message
        //alert("Login failed. Please check your credentials and try again.");
        return error.code
    }
};


const logout=()=>{
    signOut(auth);
}

export {logout,signup,login}