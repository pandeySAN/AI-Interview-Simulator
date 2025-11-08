"use client"

import Image from "next/image"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth"
import { auth } from "@/firebase/client"
import { signIn, signUp } from "@/lib/actions/auth.action"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
import React from "react"

type FormType = "sign-in" | "sign-up"

const authFormSchema = ({ type }: { type: FormType }) =>
  z.object({
    name: type === "sign-up" ? z.string().min(1, "Name is required") : z.string().optional(),
    email: z.string().email("Enter a valid email"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
  })

const AuthForm = ({ type }: { type: FormType }) => {
  const router = useRouter()
  const formSchema = authFormSchema({ type })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  })

  const [isLoading, setIsLoading] = React.useState(false)
  const isSignIn = type === "sign-in"

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const { name, email, password } = values
    setIsLoading(true)

    try {
      if (type === "sign-up") {
        // Firebase create user
        const userCredential = await createUserWithEmailAndPassword(auth, email, password)
        const idToken = await userCredential.user.getIdToken()

        // Store in your backend
        const result = await signUp({ idToken })
        if (result.success) {
          toast.success("Account created successfully!")
          router.push("/")
        } else {
          toast.error(result.message || "Sign-up failed")
        }
      } else {
        // Firebase sign in
        const user = await signInWithEmailAndPassword(auth, email, password)
        const idToken = await user.user.getIdToken()

        const result = await signIn({ idToken })
        if (result.success) {
          toast.success("Signed in successfully!")
          router.push("/")
        } else {
          toast.error(result.message || "Sign-in failed")
        }
      }
    } catch (error: any) {
      console.error("Auth error:", error)
      toast.error(error.message || "Something went wrong")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="card-border lg:min-w-[566px]">
      <div className="flex flex-col gap-6 card py-14 px-10">
        <div className="flex flex-row gap-2 justify-center">
          <Image src="/logo.svg" alt="logo" height={32} width={38} />
          <h2 className="text-primary-100">Inter.ViewAI</h2>
        </div>
        <h3>Simulation Interview with AI</h3>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6 mt-4 form">
            {!isSignIn && (
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="John Doe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="you@example.com" type="email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input placeholder="••••••••" type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button className="btn" type="submit" disabled={isLoading}>
              {isLoading ? (isSignIn ? "Signing In..." : "Creating Account...") : (isSignIn ? "Sign In" : "Create an Account")}
            </Button>
          </form>
        </Form>

        <p className="text-center">
          {isSignIn ? "Don't have an account? " : "Already have an account? "}
          <Link
            href={isSignIn ? "/sign-up" : "/sign-in"}
            className="font-bold text-user-primary ml-1"
          >
            {isSignIn ? "Sign up" : "Sign in"}
          </Link>
        </p>
      </div>
    </div>
  )
}

export default AuthForm
