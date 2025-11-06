import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { ContactEmail } from '@/app/emails/ContactEmail'; // Import your template

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const { name, email, interest, message } = await request.json();

    const data = await resend.emails.send({
      // This is the email you want to *receive* the messages at
      to: 'your-personal-email@gmail.com', 
      
      // This MUST be from your verified Resend domain
      from: 'Portfolio <contact@your-verified-domain.com>', 
      
      subject: `New Portfolio Message from ${name}`,
      
      // This is where the magic happens!
      react: ContactEmail({ 
        name,
        email,
        interest,
        message,
      }),
    });

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error });
  }
}