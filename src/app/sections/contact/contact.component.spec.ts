import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WA_NUMBER } from '../../core/whatsapp.service';
import { ContactComponent } from './contact.component';

describe('ContactComponent', () => {
  let fixture: ComponentFixture<ContactComponent>;
  let component: ContactComponent;
  let link: HTMLAnchorElement;

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    link = fixture.nativeElement.querySelector('#wa-send');
  });

  it('points the send button at the right WhatsApp number', () => {
    expect(link.href).toContain(`https://wa.me/${WA_NUMBER}`);
  });

  it('puts name, email and message into the link as the visitor types', () => {
    component.name.set('Priya');
    component.email.set('priya@example.com');
    component.message.set('Need an Angular dev');
    fixture.detectChanges();
    const text = decodeURIComponent(link.href.split('?text=')[1]);
    expect(text).toContain('Priya');
    expect(text).toContain('priya@example.com');
    expect(text).toContain('Need an Angular dev');
  });

  it('blocks sending when name or message is empty', () => {
    const click = new MouseEvent('click', { cancelable: true, bubbles: true });
    link.dispatchEvent(click);
    fixture.detectChanges();
    expect(click.defaultPrevented).toBeTrue();
    expect(component.status()).toBe('missing');
    expect(fixture.nativeElement.querySelector('#form-status').textContent).toContain('Please add your name');
  });

  it('lets the link open once name and message are filled in', () => {
    component.name.set('Priya');
    component.message.set('Hello');
    fixture.detectChanges();
    const click = new MouseEvent('click', { cancelable: true, bubbles: true });
    link.addEventListener('click', (e) => e.preventDefault()); // do not really navigate in the test
    link.dispatchEvent(click);
    fixture.detectChanges();
    expect(component.status()).toBe('ready');
    expect(fixture.nativeElement.querySelector('#form-status').textContent).toContain('Press Send there');
  });
});
