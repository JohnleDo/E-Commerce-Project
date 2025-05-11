import { Component, signal } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ToastModule } from 'primeng/toast';
import { Product } from '../../models/products.model';
import { ProductService } from '../../services/product.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-products-list',
  imports: [TableModule, ButtonModule, TagModule, FormsModule, CommonModule, ToastModule],
  providers: [MessageService],
  template: `
    <div class="w-full flex justify-center mt-10">
      <p-toast />
      <div class="w-[90%] max-w-8xl">
        <p-table
          [value]="productList()"
          [loading]="this.isLoading"
          dataKey="id"
          editMode="row"
          [paginator]="true"
          [rows]="5"
          [tableStyle]="{ 'min-width': '50rem' }"
          [rowsPerPageOptions]="[5, 10, 20]"
        >
          <ng-template pTemplate="caption">
            <div class="flex items-center justify-between w-full px-2 py-2">
              <span class="text-lg font-semibold">Products</span>
              <p-button icon="pi pi-refresh" (onClick)="this.getProducts()" />
            </div>
          </ng-template>
          <ng-template pTemplate="header">
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Description</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Status</th>
              <th></th>
            </tr>
          </ng-template>
          <ng-template pTemplate="body" let-product let-editing="editing" let-ri="rowIndex">
            <tr [pEditableRow]="product">
              <td>
                <p-cellEditor>
                  <ng-template pTemplate="input">
                    <input pInputText type="text" [(ngModel)]="product.image" required />
                  </ng-template>
                  <ng-template pTemplate="output">
                    <img
                     [src]="product.image"
                     class="w-[100px] h-[50px] object-contain"
                    />
                  </ng-template>
                </p-cellEditor>
              </td>
              <td>
                <p-cellEditor>
                  <ng-template pTemplate="input">
                    <input pInputText type="text" [(ngModel)]="product.name" required />
                  </ng-template>
                  <ng-template pTemplate="output">
                    {{ product.name }}
                  </ng-template>
                </p-cellEditor>
              </td>
              <td>
                <p-cellEditor>
                  <ng-template pTemplate="input">
                    <input pInputText type="text" [(ngModel)]="product.description" required />
                  </ng-template>
                  <ng-template pTemplate="output">
                    {{ product.description }}
                  </ng-template>
                </p-cellEditor>
              </td>
              <td>
                <p-cellEditor>
                  <ng-template pTemplate="input">
                    <input pInputText type="text" [(ngModel)]="product.price" required />
                  </ng-template>
                  <ng-template pTemplate="output">
                    {{ product.price | currency: 'USD' }}
                  </ng-template>
                </p-cellEditor>
              </td>
              <td>
                <p-cellEditor>
                  <ng-template pTemplate="input">
                    <input pInputText type="text" [(ngModel)]="product.stockQuantity" required />
                  </ng-template>
                  <ng-template pTemplate="output">
                    {{ product.stockQuantity }}
                  </ng-template>
                </p-cellEditor>
              </td>
              <td>
                <p-tag
                  [value]="product.stockQuantity === 0 ? 'Out of stock' : 'In stock: ' + product.stockQuantity"
                  [severity]="product.stockQuantity === 0 ? 'danger' : 'success'"
                />
              </td>
              <td>
                <div class="flex align-items-center justify-content-center gap-2">
                    <button 
                        *ngIf="!editing" 
                        pButton 
                        pRipple 
                        type="button" 
                        pInitEditableRow 
                        icon="pi pi-pencil" 
                        (click)="onRowEditInit(product)" 
                        class="p-button-rounded p-button-text">
                    </button>
                    <button 
                        *ngIf="editing" 
                        pButton 
                        pRipple 
                        type="button" 
                        pSaveEditableRow 
                        icon="pi pi-check" 
                        (click)="onRowEditSave(product)" 
                        class="p-button-rounded p-button-text p-button-success mr-2">
                    </button>
                    <button 
                        *ngIf="editing" 
                        pButton pRipple 
                        type="button" 
                        pCancelEditableRow 
                        icon="pi pi-times" 
                        (click)="onRowEditCancel(product, ri)" 
                        class="p-button-rounded p-button-text p-button-danger">
                    </button>
                </div>
              </td>
            </tr>
          </ng-template>
          <ng-template pTemplate="summary">
            <div class="flex align-items-center justify-content-between">
              In total there are
              {{ productList() ? productList().length : 0 }} products.
            </div>
          </ng-template>
        </p-table>
      </div>
    </div>
  `,
  styles: ``,
})
export class ProductsManageComponent {
  productList = signal<Product[]>([]);
  isLoading = false;

  constructor(private productService: ProductService, private messageService: MessageService) {}

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts(): void {
    this.isLoading = true;
    
    this.productService.GetProducts().subscribe({
      next: (result: Product[]) => {
        this.productList.set(result);
        this.isLoading = false;
        console.log('Products:', result);
      },
      error: (err: Error) => {
        this.isLoading = false;
        console.error('Error fetching products:', err);
      },
    });
  }

  onRowEditInit(product: any) {
    
  }

  onRowEditSave(product: any) {
    this.productService.UpdateProduct(product).subscribe({
      next: (result) => {
        this.productList.update(products =>
          products.map(p => p.id === result.id ? result : p)
        );
        this.messageService.add({ severity: 'success', summary: 'Success', detail: product.name + ' was updated successfully' });
      },
      error: (err: Error) => {
        this.messageService.add({severity:'error', summary: product.name + ' failed to update'})
        console.error('Error updating product:', err);
      }
    });
  }

  onRowEditCancel(product: any, rowIndex: number) {
  }
}
