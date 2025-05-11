import { CommonModule } from '@angular/common';
import { Component, Input, input, output } from '@angular/core';

@Component({
  selector: 'app-primary-button',
  imports: [CommonModule],
  template: `
    <button [disabled]="this.isDisabled" (click)="btnClicked.emit()" [ngClass]="isDisabled ? 'bg-gray-300 text-gray-600 w-full border px-5 py-2 rounded-xl shadow-sm cursor-not-allowed' : 'bg-blue-500 text-white w-full border px-5 py-2 rounded-xl shadow-md hover:opacity-90'">
      {{label()}}
    </button>
  `,
  styles: ``
})
export class PrimaryButtonComponent {
  // Signal is the equivalent to StateHasChanged
  // difference is that assigning to a variable it
  // will automatically signal when it has been update
  // and needs a re-render
  label = input('');
  @Input() isDisabled: boolean = false;

  btnClicked = output();
}
