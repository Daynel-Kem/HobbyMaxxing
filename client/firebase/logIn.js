import { signInWithEmailAndPassword } from "firebase/auth"
import {auth} from "./firebaseConfig"

export async function login(email, password) {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    )

    console.log("Logged in:", userCredential.user)
    return userCredential

  } catch (error) {
    return error
  }
}