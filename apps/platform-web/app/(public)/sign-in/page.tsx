import { Metadata } from "next"
import { SignInForm } from "./components/sign-in-form"

export const metadata: Metadata = {
  title: "Sign In",
  description: "Sign in to your Charity Query account.",
  robots: {
    index: false,
    follow: false
  }
}

export default function SignIn() {
  return (
    <SignInForm />
  )
}