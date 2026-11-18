import { Component } from '@angular/core';
import { RevealDirective } from '../../core/reveal.directive';

@Component({
  selector: 'app-cta',
  imports: [RevealDirective],
  templateUrl: './cta.component.html',
})
export class CtaComponent {}
