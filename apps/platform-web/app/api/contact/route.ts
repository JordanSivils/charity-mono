
import { Resend } from "resend";

export async function POST(req: Request) {
  try {
    const resendApiKey = process.env.RESEND_API_KEY;

    if (!resendApiKey) {
      console.error("Missing RESEND_API_KEY");
      return new Response("Server email configuration is missing", { status: 500 });
    }

    const resend = new Resend(resendApiKey);

    const body = await req.json();
    const { email, message, company } = body;

    // Honeypot
    if (company) {
      return Response.json({ success: true });
    }

    if (!email || !message) {
      return new Response("Invalid request", { status: 400 });
    }

    const { error } = await resend.emails.send({
      from: "Contact Form <no-reply@charityquery.com>",
      to: ["jordan@charityquery.com"],
      subject: "New Contact Form Submission",
      text: `From: ${email}\n\n${message}`,
      replyTo: email,
    });

    if (error) {
      console.error(error);
      return new Response("Failed to send email", { status: 500 });
    }

    return Response.json({ success: true });
  } catch (err) {
    console.error(err);
    return new Response("Server error", { status: 500 });
  }
}