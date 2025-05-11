import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { ProductsListComponent } from "./pages/products-list/products-list.component";
import { RoomInformation } from './models/roomInformation.model';
import { RoomInformationService } from './services/room-information-service';
import { ProductService } from './services/product.service';
import { Product } from './models/products.model';

@Component({
  selector: 'app-root',
  imports: [HeaderComponent, RouterOutlet],
  template: ` <app-header/>
  <router-outlet/>
  `,
  styles: [],
})
export class AppComponent {
  title = 'E-Commerce-Angular.UI';

  roomInformations: RoomInformation[] = [];
  //productList: Product[] = []

  constructor(private roomInformationService: RoomInformationService,
              private productService: ProductService
  ) {}

  // These are just testing the service and view it in console
  //ngOnInit() : void {
    // this.roomInformationService.GetRoomInformations().subscribe({
    //   next: (result: any) => {
    //     this.roomInformations = result; // TypeScript infers `RoomInformation[]` automatically
    //     console.log('RoomInformations:', result);
    //   },
    //   error: (err: any) => {
    //     console.error('Error fetching rooms:', err); // Always handle errors
    //   }
    // });

    // New products fetch
    // this.productService.GetProducts().subscribe({
    //   next: (result: any) => {
    //     this.productList = result;
    //     console.log('Products:', result);
    //   },
    //   error: (err: any) => {
    //     console.error('Error fetching products:', err);
    //   }
    // });
  //}
}
