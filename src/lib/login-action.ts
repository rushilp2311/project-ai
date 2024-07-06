"use server";
import { signIn, signOut } from "@/auth";
import { AuthError } from "next-auth";

export async function signInAction(credentials: any) {
  try {
    await signIn("credentials", credentials);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return "Invalid credentials.";
        default:
          return "Something went wrong.";
      }
    }
    throw error;
  }
}

export async function signOutAction() {
  try {
    await signOut();
  } catch (error) {
    throw error;
  }
}
