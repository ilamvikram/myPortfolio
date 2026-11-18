import { Component, ElementRef, computed, inject, signal, viewChild } from '@angular/core';
import { RevealDirective } from '../../core/reveal.directive';
import { WhatsappService } from '../../core/whatsapp.service';

type CopyKey = 'email' | 'phone';
export type FormStatus = 'idle' | 'missing' | 'ready';

const COPY_VALUES: Record<CopyKey, string> = {
  email: 'ilamvikram27@gmail.com',
  phone: '+91 9385375007',
};

@Component({
  selector: 'app-contact',
  imports: [RevealDirective],
  templateUrl: './contact.component.html',
})
export class ContactComponent {
  private readonly wa = inject(WhatsappService);

  readonly name = signal('');
  readonly email = signal('');
  readonly message = signal('');
  readonly status = signal<FormStatus>('idle');
  /** Which contact row just showed "Copied". */
  readonly copied = signal<CopyKey | 'select' | null>(null);
  private copiedKey: CopyKey | null = null;

  /** The green button is a real link to wa.me with the message already filled in. */
  readonly href = computed(() => this.wa.link(this.wa.contactMessage(this.name(), this.email(), this.message())));
  readonly valid = computed(() => this.name().trim() !== '' && this.message().trim() !== '');

  private readonly nameInput = viewChild<ElementRef<HTMLInputElement>>('nameInput');
  private readonly msgInput = viewChild<ElementRef<HTMLTextAreaElement>>('msgInput');

  send(event: Event): void {
    if (!this.valid()) {
      event.preventDefault();
      this.status.set('missing');
      const target = this.name().trim() ? this.msgInput() : this.nameInput();
      target?.nativeElement.focus();
      return;
    }
    this.status.set('ready');
  }

  copyLabel(key: CopyKey): string {
    if (this.copiedKey !== key || this.copied() === null) {
      return 'Tap to copy';
    }
    return this.copied() === 'select' ? 'Selected, press copy' : 'Copied';
  }

  copy(key: CopyKey, event: Event): void {
    const done = (how: 'select' | CopyKey) => {
      this.copiedKey = key;
      this.copied.set(how === 'select' ? 'select' : key);
      setTimeout(() => this.copied.set(null), how === 'select' ? 2000 : 1600);
    };
    const select = () => {
      const row = (event.currentTarget as HTMLElement | null)?.querySelector('.v');
      try {
        if (row) {
          const range = document.createRange();
          range.selectNodeContents(row);
          const sel = window.getSelection();
          sel?.removeAllRanges();
          sel?.addRange(range);
        }
      } catch {
        /* selection is only a convenience */
      }
      done('select');
    };
    try {
      if (navigator.clipboard?.writeText) {
        navigator.clipboard.writeText(COPY_VALUES[key]).then(() => done(key), select);
        return;
      }
    } catch {
      /* fall through to the selection fallback */
    }
    select();
  }
}
