import { Component, inject, input } from '@angular/core';
import { CartService } from '../../../services/cart.service';
import { Product } from '../../../models/products.model';
import { ButtonComponent } from '../../../components/button/button.component';

@Component({
  selector: 'app-cart-item',
  imports: [ButtonComponent],
  template: `
    <div
      class="bg-slate-800 shadow-md border rounded-xl p-6 flex gap-4 items-center"
    >
      <img [src]="item().image" class="w-[50px] h-[50px] object-contain" />
      <div class="flex flex-col">
        <span class="text-md font-bold">{{ item().name }}</span>
        <span class="text-sm"> {{ '$' + (item().price * (item().cartQuantity ?? 1)).toFixed(2) }}</span>
        <span class="text-sm"> {{ 'x' + item().cartQuantity }}</span>
      </div>
      <div class="flex-1"></div>
      <app-button
        label="Remove"
        (btnClicked)="cartService.removeFromCart(item().id)"
        [buttonClass]="'bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-red-600'"
      />
    </div>
  `,
  styles: ``,
})
export class CartItemComponent {
  item = input.required<Product>();

  cartService = inject(CartService);
}
