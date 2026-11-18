import { Injectable } from '@angular/core';

/** Ilam's WhatsApp number in international format, digits only (no +, spaces or dashes). */
export const WA_NUMBER = '919385375007';

@Injectable({ providedIn: 'root' })
export class WhatsappService {
  readonly number = WA_NUMBER;
  readonly greeting = 'Hi Ilam, I saw your portfolio and would like to connect.';

  /** https://wa.me/<number>?text=<encoded text> */
  link(text?: string): string {
    const base = `https://wa.me/${this.number}`;
    return text ? `${base}?text=${encodeURIComponent(text)}` : base;
  }

  /** The message that is pre-filled in WhatsApp from the contact form. */
  contactMessage(name: string, email: string, message: string): string {
    const n = name.trim();
    const e = email.trim();
    const m = message.trim();
    return `Hi Ilam, I am ${n || 'a visitor'}${e ? ` (${e})` : ''}.\n\n${m}\n\n(Sent from your portfolio)`;
  }
}
