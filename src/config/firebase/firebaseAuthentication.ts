import { createUserWithEmailAndPassword as createUserWithEmailAndPasswordFirebase, signInWithEmailAndPassword as signInWithEmailAndPasswordFirebase, sendPasswordResetEmail, Auth } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { conAuth, conDatabase } from "./firebaseConfig";


export const createUserWithEmailAndPassword = async (
  userEmail: string,
  userPassword: string,
  userDisplayName: string,
  userDivision: string
) => {
  try {
    const userCredential = await createUserWithEmailAndPasswordFirebase(
      conAuth,
      userEmail,
      userPassword
    );

    const { uid } = userCredential.user;

    let validDepartments = [
      "Admin",
      "Benselcom",
      "Planning",
      "Community Organizer",
      "Demolition",
    ];

    if (validDepartments.includes(userDivision)) {
      const userData = {
        userID: uid,
        userEmail,
        userDisplayName,
        userDivision,
        userAccountType: "Regular",
        userAccountStatus: "Pending",
        authProvider: "local",
      };

      await setDoc(doc(conDatabase, `users/${uid}`), userData);
      console.log("User document created successfully");
    } else {
      throw new Error("Invalid division specified.");
    }
  } catch (error) {
    console.error("Error creating user document:", error);
    throw error;
  }
};

export const signInWithEmailAndPassword = async (userEmail: string, userPassword: string) => {
  try {
    const userCredential = await signInWithEmailAndPasswordFirebase(conAuth, userEmail, userPassword);
    return userCredential.user;
  } catch (error) {
    throw error;
  }
};


export const resetPassword = async (auth: Auth, userEmail: string) => {
  try {
      await sendPasswordResetEmail(auth, userEmail); 
      console.log("Password reset email sent successfully");
      return userEmail;
  } catch (error) {
      console.error("Error sending password reset email:", error);
      throw error;
  }
}

export const logoutUser = async (): Promise<void> => {
  try {
    await conAuth.signOut();
    window.location.href = "/";
  } catch (error) {
    throw error;
  }
};
