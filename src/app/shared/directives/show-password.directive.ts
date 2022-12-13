import { Directive, HostListener, Input } from '@angular/core';

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: '[showPassword]',
})
export class ShowPasswordDirective {
  @Input() showPassword: HTMLInputElement;

  @HostListener('mouseup')
  onMouseOver(): void {
    this.showPassword.type = 'password';
  }

  @HostListener('mouseleave')
  onMouseLeave(): void {
    this.showPassword.type = 'password';
  }

  @HostListener('mousedown')
  onMouseDown(): void {
    this.showPassword.type = 'text';
  }
}
