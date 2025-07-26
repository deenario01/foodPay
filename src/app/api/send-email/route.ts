import { Resend } from 'resend';
import { NextRequest, NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

interface EmailRequest {
    email: string;
    otp: number;
  }

export async function POST(request: NextRequest) {
    try {
      const body = await request.json();
      const { email, otp } = body;
  
      console.log("Received request:", body);
  
      if (!email || typeof otp !== "number" || email.trim() === "") {
        return NextResponse.json(
          { error: "Invalid request body: 'email' and 'otp (number)' are required." },
          { status: 400 }
        );
      }
  
      const { data, error } = await resend.emails.send({
        from: 'maham@resend.dev',
        to: 'maham.zaidi6@gmail.com',
        subject: 'Your OTP for FoodPay',
        html: `<p>Your OTP is <strong>${otp.toString()}</strong></p>`,
      });
  
      if (error) {
        console.error('Resend error:', error);
        return NextResponse.json({ error: error.message }, { status: 400 });
      }
  
      return NextResponse.json({ success: true, data });
    } catch (error) {
      console.error("Error in /api/send-email:", error);
      return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
    }
  }
  