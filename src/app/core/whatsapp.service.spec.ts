import { TestBed } from '@angular/core/testing';
import { WA_NUMBER, WhatsappService } from './whatsapp.service';

describe('WhatsappService', () => {
  let service: WhatsappService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WhatsappService);
  });

  it('builds a plain chat link', () => {
    expect(service.link()).toBe(`https://wa.me/${WA_NUMBER}`);
  });

  it('uses digits only for the number', () => {
    expect(WA_NUMBER).toMatch(/^\d{10,15}$/);
  });

  it('url-encodes the pre-filled text', () => {
    const url = service.link('Hi Ilam & team\nhello');
    expect(url).toBe(`https://wa.me/${WA_NUMBER}?text=Hi%20Ilam%20%26%20team%0Ahello`);
  });

  it('builds the contact message with name, email and message', () => {
    const text = service.contactMessage(' Priya ', 'priya@example.com', ' Need an Angular dev ');
    expect(text).toBe('Hi Ilam, I am Priya (priya@example.com).\n\nNeed an Angular dev\n\n(Sent from your portfolio)');
  });

  it('skips the email and falls back to "a visitor"', () => {
    expect(service.contactMessage('', '', 'Hello')).toContain('Hi Ilam, I am a visitor.');
  });
});
