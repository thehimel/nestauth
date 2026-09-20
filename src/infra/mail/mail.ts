import { Resend } from 'resend';
// Relative imports: this file is loaded from auth.ts, which itself runs outside Nest's own
// module resolution and does not understand the "@/" alias.
import { DEFAULT_BRAND_NAME } from '../config/config.constants.js';

export async function sendMagicLinkEmail(email: string, url: string): Promise<void> {
  const resend = new Resend(process.env.RESEND_API_KEY);
  const brandName = process.env.BRAND_NAME || DEFAULT_BRAND_NAME;

  const { error } = await resend.emails.send({
    from: process.env.RESEND_FROM_EMAIL as string,
    to: email,
    subject: `Sign in to ${brandName}`,
    html: `<a href="${url}">Sign in</a>`,
  });

  if (error) {
    throw new Error(error.message);
  }
}
