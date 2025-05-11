import { Component, inject, signal } from '@angular/core';
import { PrimaryButtonComponent } from "../primary-button/primary-button.component";
import { CartService } from '../../services/cart.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [PrimaryButtonComponent, RouterLink],
  template: `
      <div class="bg-slate-800 px-4 py-3 shadow-md flex justify-between items-center text-white">
        <!-- {{title()}} -->
        <button class="text-xl" routerLink="/">My Store</button>
        <button class="text-xl" routerLink="/manage">Manage Products</button>
        <!--[label] - binds a dynamic value -->
        <app-primary-button [label]="'Cart(' + getCartQuantity() + ')'" routerLink="/cart"/>
      </div>
  `,
  styles: `
    .header {
      background: rgba(0,0,0,.5);
      color: black;
      padding: 1rem;
    }
  `
})
export class HeaderComponent {
  // Signal is the equivalent to StateHasChanged
  // difference is that assigning to a variable it
  // will automatically signal when it has been update
  // and needs a re-render
  cartService = inject(CartService)

  getCartQuantity() {
    let amount = 0;

    for (const item of this.cartService.cart()) {
      if (item.cartQuantity) {
        amount += item.cartQuantity;
      }
    }

    return amount;
  }
}
