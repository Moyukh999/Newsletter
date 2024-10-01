import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import fs from 'fs/promises'; // To read files from the file system
import path from 'path'; // To handle file paths

// Email configuration (use your email provider details)
const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.EMAIL_USER, // Make sure these env vars are set
    pass: process.env.EMAIL_PASS,
  },
});

// Function to load and prepare the template
async function loadTemplate(templateName: string, replacements: { [key: string]: string }) {
  const templatePath = path.join(process.cwd(), 'Template', templateName);
  try {
    let template = await fs.readFile(templatePath, 'utf8');
    
    // Replace placeholders in the template
    for (const [key, value] of Object.entries(replacements)) {
      const regex = new RegExp(`{{${key}}}`, 'g');
      template = template.replace(regex, value);
    }
    
    return template;
  } catch (error) {
    console.error('Error loading template:', error);
    throw new Error('Template loading error');
  }
}

// Exported POST function for Route Handler
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { template, subject, content, recipients } = body;

    if (!recipients || !Array.isArray(recipients) || recipients.length === 0) {
      return NextResponse.json({ message: 'No recipients defined' }, { status: 400 });
    }

    // Send emails
    const sendEmails = recipients.map(async (recipient: { Name: string; Email: string }) => {
      if (!recipient.Email) {
        console.error('Recipient email is missing:', recipient);
        throw new Error('Recipient email is missing');
      }

      // Load the template and replace placeholders
      const emailContent = await loadTemplate(template, {
        content: content,
        name: recipient.Name,
      });

      console.log(`Sending email to: ${recipient.Name} <${recipient.Email}>`);

      return transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: recipient.Email,
        subject: subject,
        html: emailContent, // Use the processed template
      });
    });

    await Promise.all(sendEmails);

    return NextResponse.json({ message: 'Emails sent successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error sending emails:', error);
    return NextResponse.json({ message: 'Error sending emails', error }, { status: 500 });
  }
}
