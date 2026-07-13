import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Read the Charity Query pricacy policy and leaern how we handle you information."
}

export default function PrivacyPage() {
  return (
    <div className="flex flex-col gap-6 max-w-3xl">
      <h1 className="text-3xl font-semibold tracking-tight">Privacy Policy</h1>

      <p className="text-muted-foreground">
        CharityQuery is designed to be simple, transparent, and developer-friendly.
        This page explains what data is collected and how it is used.
      </p>

      <Card>
        <CardHeader>
          <CardTitle>Information We Collect</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-3 text-sm">
          <p><strong>Account Information</strong></p>
          <p>
            When you create an account, we collect basic information such as your
            username and authentication data through our authentication provider.
          </p>

          <p><strong>API Usage Data</strong></p>
          <p>
            We track API usage to enforce rate limits and improve performance.
            This may include request counts, timestamps, and related metadata.
          </p>

          <p><strong>Contact Information</strong></p>
          <p>
            If you submit a message through the contact form, we receive your email
            address and message content.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>How We Use Information</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-3 text-sm">
          <ul className="list-disc pl-5 space-y-1">
            <li>Provide and maintain the API</li>
            <li>Authenticate users and manage accounts</li>
            <li>Enforce rate limits and prevent abuse</li>
            <li>Respond to support or contact requests</li>
            <li>Improve performance and reliability</li>
          </ul>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Third-Party Services</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-3 text-sm">
          <p>
            CharityQuery uses third-party services to operate:
          </p>

          <ul className="list-disc pl-5 space-y-1">
            <li>Authentication provider for account management</li>
            <li>Email provider for contact form delivery</li>
            <li>Hosting and infrastructure providers</li>
          </ul>

          <p className="text-muted-foreground">
            These services may process data as required to perform their functions.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Data Storage and Retention</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-3 text-sm">
          <p>
            We store only the data necessary to operate the service.
          </p>
          <p>
            Some data, such as rate limiting counters, may be stored temporarily.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Data Sharing</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-3 text-sm">
          <p>
            We do not sell or share your personal data with third parties for
            marketing purposes.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Security</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-3 text-sm">
          <p>
            Reasonable measures are taken to protect user data. However, no system
            can guarantee absolute security.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Changes to This Policy</CardTitle>
        </CardHeader>
        <CardContent className="text-sm">
          <p>
            This policy may be updated as the product evolves. Continued use of the
            service indicates acceptance of any changes.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Contact</CardTitle>
        </CardHeader>
        <CardContent className="text-sm">
          <p>
            If you have any questions, please use the contact form available on the site.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}