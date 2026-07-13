
import { Metadata } from "next"
import { SignUpForm } from "./components/sign-up-form"

export const metadata: Metadata = {
  title: "Sign Up",
  description: "Create a Charity Query account and get started.",
  robots: {
    index: false,
    follow: false
  }
}

export default function SignUpPage() {
  return (
    <SignUpForm />
  )
}