import { Component, inject } from '@angular/core';
import { WhatsappService } from '../core/whatsapp.service';

/** Always-visible floating WhatsApp button (bottom right). */
@Component({
  selector: 'app-whatsapp-fab',
  templateUrl: './whatsapp-fab.component.html',
})
export class WhatsappFabComponent {
  readonly wa = inject(WhatsappService);
}
