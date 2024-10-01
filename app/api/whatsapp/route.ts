import { NextResponse } from "next/server";
import Twilio from "twilio";

export async function POST(req: Request) {
  try {
    const { message } = await req.json();
    // const message = "Hello from Next.js!";

    const client = Twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

    const response = await client.messages.create({
      body: message,
      from: `whatsapp:${process.env.TWILIO_PHONE_NUMBER}`,
      to: `whatsapp:${process.env.MY_PHONE_NUMBER}`,
    });

    return NextResponse.json({ success: true, response });
  } catch (error) {
    console.error("Error sending WhatsApp message:", error);
    return NextResponse.json({ success: false, error: error }, { status: 500 });
  }
}
