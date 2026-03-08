import { createUserWithEmailAndPassword } from "firebase/auth"
import { auth } from "./firebaseConfig"

export async function signUp(email, password) {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    )

    console.log("User created:", userCredential.user)
    return userCredential

  } catch (error) {
    return error
  }
}