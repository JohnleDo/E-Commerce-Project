import { Component, inject, input } from '@angular/core';
import { Product } from '../../../models/products.model';
import { PrimaryButtonComponent } from "../../../components/primary-button/primary-button.component";
import { CartService } from '../../../services/cart.service';

@Component({
  selector: 'app-product-card',
  imports: [PrimaryButtonComponent],
  template: `
    <div
      class="bg-slate-800 shadow-md border rounded-xl p-6 flex flex-col gap-6 relative"
    >
      <div class="mx-auto">
        <img
          [src]="product().image"
          class="w-[200px] h-[100px] object-contain"
        />
      </div>
      <div class="flex flex-col">
        <span class="text-md font-bold">{{ product().name }}</span>
        <span class="text-sm"> {{ '$' + product().price }}</span>
        <app-primary-button
          [isDisabled]="product().stockQuantity === 0"
          (btnClicked)="cartService.addToCart(product())"
          class="mt-3"
          label="Add to Cart"
        />
      </div>

      <span
        class="absolute top-2 right-3 text-sm font-bold"
        [class]="product().stockQuantity ? 'text-green-500' : 'text-red-500'"
      >
        @if (product().stockQuantity) {
        {{ product().stockQuantity }} left } @else { Out of stock }
      </span>
    </div>
  `,
  styles: ``
})
export class ProductCardComponent {
  cartService = inject(CartService);

  product = input.required<Product>();
}
