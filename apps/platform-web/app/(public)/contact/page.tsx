import { Metadata } from "next"
import { ContactForm } from "./components/contact-form"

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact Charity Query for questions about the API, integrations, or general support."
}

export default function ContactPage() {

  return (
    <>
      <ContactForm />
    </>
  )
}
