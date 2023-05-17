import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appCommaFormat]'
})
export class CommaFormatDirective {
  constructor(private el: ElementRef) { }

  @HostListener('focus', ['$event.target.value'])
  onFocus(value: string) {
    console.log(value);
    this.el.nativeElement.value = this.removeCommas(value);
  }

  @HostListener('blur', ['$event.target.value'])
  onBlur(value: string) {
    this.el.nativeElement.value = this.formatNumber(value);
  }

  private formatNumber(value: string): string {
    const number = parseFloat(value.replace(/,/g, ''));
    return isNaN(number) ? '' : number.toLocaleString('en-US');
  }

  private removeCommas(value: string): string {
    return value.replace(/,/g, '');
  }
}
