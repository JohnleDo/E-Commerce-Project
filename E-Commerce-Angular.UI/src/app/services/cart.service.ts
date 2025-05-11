import { Injectable, signal } from '@angular/core';
import { Product } from '../models/products.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  
  cart = signal<Product[]>([])

  addToCart(product: Product): void {
    const existingItem = this.cart().find(x => x.id === product.id);

    if (existingItem) {
      this.cart.update(() => {
        const currentCart = this.cart();
        const index = currentCart.findIndex(p => p.id === product.id);

        if (index !== -1) {
          const updated = [...currentCart];  // Copy the array to maintain immutability
          updated[index] = {
            ...updated[index],  // Copy the existing item
            cartQuantity: (updated[index].cartQuantity ?? 0) + 1
          };
          return updated;
        }

        return [...currentCart, { ...product, cartQuantity: 1 }];
      });
    }
    else {
      product.cartQuantity = 1;
      this.cart.set([...this.cart(), product]);
    }
    
  }

  removeFromCart(id: number): void {
    this.cart.update(currentCart => {
      // Flatmap is used when you need to map an array to another array but sometimes that array could range from
      // 0+ items to be mapped. If it was 1+ then we would use just .Map function
      return currentCart.flatMap(item => {
        if (item.id === id) {
          const qty = item.cartQuantity ?? 1; // default to 1 if null/undefined

          if (qty > 1) {
            return [{ ...item, cartQuantity: qty - 1 }];
          } else {
            return []; // remove item if quantity <= 1
          }
        }
        return [item];
      });
    });
  }

  constructor() { }
}
