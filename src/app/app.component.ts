import { Component, HostListener } from '@angular/core';
import { SiteFooterComponent } from './layout/site-footer.component';
import { SiteHeaderComponent } from './layout/site-header.component';
import { SpriteComponent } from './layout/sprite.component';
import { WhatsappFabComponent } from './layout/whatsapp-fab.component';
import { AboutComponent } from './sections/about/about.component';
import { ContactComponent } from './sections/contact/contact.component';
import { CtaComponent } from './sections/cta/cta.component';
import { ExperienceComponent } from './sections/experience/experience.component';
import { HeroComponent } from './sections/hero/hero.component';
import { ProjectsComponent } from './sections/projects/projects.component';
import { ServicesComponent } from './sections/services/services.component';
import { SkillsComponent } from './sections/skills/skills.component';
import { WhyComponent } from './sections/why/why.component';

const CARD_SELECTOR = '.area,.why,.proj,.skill,.stats li,.tl-card';

@Component({
  selector: 'app-root',
  imports: [
    SpriteComponent,
    SiteHeaderComponent,
    HeroComponent,
    AboutComponent,
    WhyComponent,
    ServicesComponent,
    SkillsComponent,
    ExperienceComponent,
    ProjectsComponent,
    ContactComponent,
    CtaComponent,
    SiteFooterComponent,
    WhatsappFabComponent,
  ],
  template: `
    <app-sprite />
    <app-site-header />
    <main>
      <app-hero />
      <app-about />
      <app-why />
      <app-services />
      <app-skills />
      <app-experience />
      <app-projects />
      <app-contact />
      <app-cta />
    </main>
    <app-site-footer />
    <app-whatsapp-fab />
  `,
})
export class AppComponent {
  /** Click or tap a card to keep it highlighted; click it again (or elsewhere) to clear. */
  @HostListener('document:click', ['$event'])
  onDocumentClick(e: MouseEvent): void {
    const target = e.target as HTMLElement | null;
    const card = target?.closest?.(CARD_SELECTOR) ?? null;
    if (card && target?.closest('button,a,input,textarea')) {
      return;
    }
    const wasSelected = card?.classList.contains('sel') ?? false;
    document.querySelectorAll(`${CARD_SELECTOR}.sel`).forEach((x) => x.classList.remove('sel'));
    if (card && !wasSelected) {
      card.classList.add('sel');
    }
  }
}
