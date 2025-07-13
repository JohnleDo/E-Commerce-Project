import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';

import { Product } from '../../models/products.model';
import { ProductService } from '../../services/product.service';

import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { ToastModule } from 'primeng/toast';
import { DialogModule } from 'primeng/dialog';
import { MessageService } from 'primeng/api';

// TODO: Need to add validation in backend for the product model
// TODO: When deleting a product, it does a weird reload. Figure out a better
//       way to do it. It feels gltichy
// TODO: Add filtering and sorting functionality
// TODO: Add popup confirmation when deleting a product
// TODO: Make the DialogCancel function modular where it can be used in other places.
//       May want to use it after deleting a product since it's causing validations to
//       appear when deleting a product
@Component({
  selector: 'app-products-list',
  imports: [CommonModule, FormsModule, ButtonModule, DialogModule, TableModule, TagModule, ToastModule],
  providers: [MessageService],
  template: `
    <!-- Dialog Code -->
    <div class="card flex justify-center">
      <p-dialog header="Add New Product" [modal]="true" [(visible)]="dialogIsVisible" [style]="{ width: '30rem' }">
        <span class="p-text-secondary block mb-8">Enter product details below.</span>
        <form #productForm="ngForm" (ngSubmit)="productForm.valid && this.addProduct()">
          <div class="flex items-center gap-4 mb-4">
            <label for="productName" class="font-semibold w-24">Name</label>
            <input pInputText id="productName" class="flex-auto" [(ngModel)]="newProduct.name" name="name" required autocomplete="off" />
            <div *ngIf="productForm.submitted && (!newProduct.name || newProduct.name.trim() === '')" class="text-red-500 text-sm">
              Name is required.
            </div>
          </div>
          <div class="flex items-center gap-4 mb-4">
            <label for="productDescription" class="font-semibold w-24">Description</label>
            <input pInputText id="productDescription" class="flex-auto" [(ngModel)]="newProduct.description" name="description" required autocomplete="off" />
            <div *ngIf="productForm.submitted && (!newProduct.description || newProduct.description.trim() === '')" class="text-red-500 text-sm">
              Description is required.
            </div>
          </div>
          <div class="flex items-center gap-4 mb-4">
            <label for="productPrice" class="font-semibold w-24">Price</label>
            <input pInputText id="productPrice" type="number" class="flex-auto" [(ngModel)]="newProduct.price" name="price" required autocomplete="off" />
            <div *ngIf="productForm.submitted && newProduct.price <= 0" class="text-red-500 text-sm">
              Price must be greater than 0.
            </div>
          </div>
          <div class="flex items-center gap-4 mb-4">
            <label for="productQuantity" class="font-semibold w-24">Quantity</label>
            <input pInputText id="productQuantity" type="number" class="flex-auto" [(ngModel)]="newProduct.stockQuantity" name="stockQuantity" required autocomplete="off" />
            <div *ngIf="productForm.submitted && newProduct.stockQuantity <= 0" class="text-red-500 text-sm">
              Quantity must be greater than 0.
            </div>
          </div>
          <div class="flex items-center gap-4 mb-8">
            <label for="productImage" class="font-semibold w-24">Image URL</label>
            <input pInputText id="productImage" class="flex-auto" [(ngModel)]="newProduct.image" name="image" required autocomplete="off" />
            <div *ngIf="productForm.submitted && (!newProduct.image || newProduct.image.trim() === '')" class="text-red-500 text-sm">
              Image URL is required.
            </div>
          </div>
          <div class="flex justify-end gap-2">
            <p-button label="Cancel" severity="secondary" (click)="this.onDialogCancel(productForm)" />
            <p-button label="Save" type="submit" />
          </div>
        </form>
      </p-dialog>
    </div>

    <!-- Table Code -->
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
              <div class="flex gap-2">
                <p-button icon="pi pi-plus" (onClick)="this.showDialog()" />
                <p-button icon="pi pi-refresh" (onClick)="this.getProducts()" />
            </div>
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
                        *ngIf="!editing" 
                        pButton 
                        pRipple 
                        type="button" 
                        pInitEditableRow 
                        icon="pi pi-trash" 
                        (click)="onRowDelete(product)" 
                        class="p-button-rounded p-button-text p-button-danger">
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
  dialogIsVisible = false;

  newProduct: Product = {
    id: 0, 
    name: '',
    description: '',
    price: 1,
    stockQuantity: 1,
    image: ''
  };

  constructor(private productService: ProductService, private messageService: MessageService) {}

  ngOnInit(): void {
    this.getProducts();
  }

  showDialog():void {
    this.dialogIsVisible = true;
  }

  onDialogCancel(productForm: NgForm): void {
    // Reset the form's validation state
    productForm.resetForm();

    // Reset the form when the dialog is closed
    this.newProduct = {
    id: 0, 
    name: '',
    description: '',
    price: 1,
    stockQuantity: 1,
    image: ''
    };

    this.dialogIsVisible = false;
  }

  getProducts(): void {
    this.isLoading = true;
    
    this.productService.GetProducts().subscribe({
      next: (result: Product[]) => {
        // Sort products by id in descending order, would've been better if I 
        // implemented an CreatedDateTime and UpdatedDateTime and sorta by that
        const sortedProducts = result.sort((a, b) => b.id - a.id);
        this.productList.set(sortedProducts);
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

  onRowDelete(product: any) {
    this.productService.DeleteProduct(product.id).subscribe({
      next: (result) => {
        this.productList.update(products =>
          products.filter(p => p.id !== result.id)
        );
        this.messageService.add({ severity: 'success', summary: 'Success', detail: product.name + ' was deleted successfully' });
        this.getProducts(); // Refresh the product list
      },
      error: (err: Error) => {
        this.messageService.add({severity:'error', summary: product.name + ' failed to delete'})
        console.error('Error deleting product:', err);
      }
    });
  }

  addProduct(): void {
    this.productService.AddProduct(this.newProduct).subscribe({
      next: (result: Product) => {
        this.productList.update(products => [...products, result]); // Add the new product with the generated id
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Product added successfully' });
        this.dialogIsVisible = false;
        this.newProduct = { id: 0, name: '', description: '', price: 1, stockQuantity: 1, image: '' }; // Reset form
        this.getProducts(); // Refresh the product list
      },
      error: (err: Error) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to add product' });
        console.error('Error adding product:', err);
      }
    });
  }
}
