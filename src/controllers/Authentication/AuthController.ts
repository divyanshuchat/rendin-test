/* eslint-disable import/no-anonymous-default-export */
import {
  getAuth,
  fetchSignInMethodsForEmail,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { getDatabase, ref, set, child, get } from "firebase/database";
import { AuthInputProps } from "../../interfaces/AuthInputProps";

async function firebaseAuth(authCredentials: AuthInputProps): Promise<any> {
  const auth = getAuth();
  return await fetchSignInMethodsForEmail(auth, authCredentials.email)
    .then(async (response) => {
      if (!response.length) {
        return { result: "success", user: null, showName: true };
      } else {
        const loginUser = await signInWithEmailAndPassword(auth, authCredentials?.email, authCredentials?.password);
        return await getUserInfo(loginUser.user.uid);
      }
    })
    .catch((error) => {
      if (error.code === "auth/wrong-password") {
        return { result: "error", error: "Password is Wrong, try again." };
      }

      if (error.code === "auth/invalid-email") {
        return { result: "error", error: "Email is in incorrect format, please fix." };
      }
    });
}

async function signupUser(authCredentials: AuthInputProps) {
  const auth = getAuth();
  return await createUserWithEmailAndPassword(auth, authCredentials?.email, authCredentials?.password)
    .then(async (userData) => {
      const db = getDatabase();
      set(ref(db, "users/" + userData.user.uid), {
        email: userData.user.email,
        userId: userData.user.uid,
        name: authCredentials.name,
        userImage: "https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png",
      });
      return await getUserInfo(userData.user.uid);
    })
    .catch((error) => {
      return { result: "error", error: "Email is in incorrect format, please fix." };
    });
}

async function getUserInfo(uid: string) {
  const dbRef = ref(getDatabase());
      return await get(child(dbRef, `users/${uid}`))
        .then((snapshot) => {
          if (snapshot.exists()) {
            return { result: "success", user: snapshot.val() };
          } else {
            return {
              result: "error",
              error: "Unable to find corresponding user in database. Try again with another email",
            };
          }
        })
        .catch((error) => {
          return {
            result: "error",
            error: "Unable to find corresponding user in database. Try again with another email",
          };
        });
}

async function signOut() {
  const auth = getAuth();
  return await auth.signOut();
}

export default {
  firebaseAuth,
  signupUser,
  signOut,
  getUserInfo,
};
