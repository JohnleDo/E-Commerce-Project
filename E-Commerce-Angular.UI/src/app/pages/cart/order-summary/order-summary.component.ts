import { Component, computed, inject } from '@angular/core';
import { PrimaryButtonComponent } from '../../../components/primary-button/primary-button.component';
import { CartService } from '../../../services/cart.service';

// TODO: Add checkout functionality where it will reduce the quantity in the database

@Component({
  selector: 'app-order-summary',
  imports: [PrimaryButtonComponent],
  template: `
    <div class="bg-slate-800 p-6 rounded-xl shadow-xl border">
      <h2 class="text-2xl">Order Summary</h2>
      <div class="flex flex-col gap-4">
        <div class="flex gap-4">
          <span class="text-lg">Total</span>
          <span class="text-lg font-bold">{{ '$ ' + total() }}</span>
        </div>
        <app-primary-button label="Proceed to checkout" />
      </div>
    </div>
  `,
  styles: ``,
})
export class OrderSummaryComponent {
  cartService = inject(CartService);

  // Computed is a function for doing math operations with signal objects
  total = computed(() => {
    let total = 0;
    for (const item of this.cartService.cart()) {
      if (item.cartQuantity) {
        total += (item.price * item.cartQuantity);
      }
    }

    return total.toFixed(2);
  });
}