import { Component, Input, input, output } from '@angular/core';

@Component({
  selector: 'app-button',
  imports: [],
  template: `
    <button
      [class]="buttonClass"
      (click)="btnClicked.emit()"
    >
      <span class="text-md">{{ label }}</span>
    </button>
  `,
  styles: ``,
})
export class ButtonComponent {
  @Input() label: string = '';  // Default value for label
  @Input() buttonClass: string = 'text-black w-full px-5 py-2 rounded-xl shadow-md hover:bg-slate-200'; // Default class


  btnClicked = output();
}
