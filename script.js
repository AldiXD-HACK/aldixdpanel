// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCdq0L5V9sDdAWv3z8PSpXtYvZxUQhG4RQ",
  authDomain: "axpadm-e2741.firebaseapp.com",
  databaseURL: "https://axpadm-e2741-default-rtdb.firebaseio.com",
  projectId: "axpadm-e2741",
  storageBucket: "axpadm-e2741.firebasestorage.app",
  messagingSenderId: "199853898540",
  appId: "1:199853898540:web:dfd88a92353a37a9c20a89",
  measurementId: "G-39ZTV27YWQ"
};

// Initialize Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-auth.js";
import { getFirestore, doc, setDoc, collection, getDocs } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-firestore.js";

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Create user and save to Firestore
document.getElementById("create-user-form").addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  const expiry = document.getElementById("expiry").value;

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Save expiry to Firestore
    await setDoc(doc(db, "users", user.uid), {
      email: email,
      expiry: expiry
    });

    alert("User created successfully!");
    loadUsers(); // Refresh user list
  } catch (error) {
    alert("Error: " + error.message);
  }
});

// Load users from Firestore
async function loadUsers() {
  const usersList = document.getElementById("users");
  usersList.innerHTML = "";

  const querySnapshot = await getDocs(collection(db, "users"));
  querySnapshot.forEach((doc) => {
    const user = doc.data();
    const li = document.createElement("li");
    li.textContent = `Email: ${user.email}, Expiry: ${user.expiry}`;
    usersList.appendChild(li);
  });
}

// Initial load
loadUsers();