import { Component, inject } from '@angular/core';
import { WhatsappService } from '../core/whatsapp.service';

@Component({
  selector: 'app-site-footer',
  templateUrl: './site-footer.component.html',
})
export class SiteFooterComponent {
  readonly wa = inject(WhatsappService);
}
