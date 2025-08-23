"use server"

import { cookies } from "next/headers"
import { auth } from "@/firebase/admin"
import { SignJWT } from "jose"
import { nanoid } from "nanoid"

// Sign in user and set session cookie
export async function signIn({ idToken }: { idToken: string }) {
  try {
    const decodedToken = await auth.verifyIdToken(idToken)
    const sessionId = nanoid()

    // Create a JWT session
    const token = await new SignJWT({ uid: decodedToken.uid })
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("7d")
      .sign(new TextEncoder().encode(process.env.JWT_SECRET!))

    const cookieStore = await cookies()
    cookieStore.set("session", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    })

    return { success: true }
  } catch (error: any) {
    console.error("Sign-in error:", error)
    return { success: false, message: error.message }
  }
}

// Sign up user
export async function signUp({
  name,
  email,
  password,
}: {
  name: string
  email: string
  password: string
}) {
  try {
    const user = await auth.createUser({
      email,
      password,
      displayName: name,
    })

    return { success: true, uid: user.uid }
  } catch (error: any) {
    console.error("Sign-up error:", error)
    return { success: false, message: error.message }
  }
}

// Check if user is authenticated
export async function isAuthenticated(): Promise<boolean> {
  try {
    const cookieStore = await cookies()
    const session = cookieStore.get("session")
    return !!session
  } catch (error) {
    console.error("Auth check error:", error)
    return false
  }
}

// Logout user
export async function signOut() {
  const cookieStore = await cookies()
  cookieStore.delete("session")
  return { success: true }
}
