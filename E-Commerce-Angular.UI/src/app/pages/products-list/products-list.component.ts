import { Component, signal } from '@angular/core';
import { Product } from '../../models/products.model';
import { ProductCardComponent } from "./product-card/product-card.component";
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-products-list',
  imports: [ProductCardComponent],
  template: `
    <div class="p-8 grid grid-cols-2 gap-4">
      @for (product of productList(); track product.id) {
      <app-product-card [product]="product" />
      }
    </div>
  `,
  styles: ``
})

export class ProductsListComponent {
  productList = signal<Product[]>([]);

  constructor(private productService: ProductService) {}

  ngOnInit() : void {
    this.productService.GetProducts().subscribe({
      next: (result: Product[]) => {
        this.productList.set(result);
        console.log('Products:', result);
      },
      error: (err: Error) => {
        console.error('Error fetching products:', err);
      }
    });
  }
}
