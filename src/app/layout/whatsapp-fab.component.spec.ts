import { TestBed } from '@angular/core/testing';
import { WA_NUMBER } from '../core/whatsapp.service';
import { WhatsappFabComponent } from './whatsapp-fab.component';

describe('WhatsappFabComponent', () => {
  it('links straight to Ilam on WhatsApp in a new tab', () => {
    const fixture = TestBed.createComponent(WhatsappFabComponent);
    fixture.detectChanges();
    const a: HTMLAnchorElement = fixture.nativeElement.querySelector('a.fab-wa');
    expect(a.href).toContain(`https://wa.me/${WA_NUMBER}`);
    expect(a.target).toBe('_blank');
    expect(a.rel).toContain('noopener');
  });
});
