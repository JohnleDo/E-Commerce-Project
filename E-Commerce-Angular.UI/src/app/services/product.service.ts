import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../models/products.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private url = "/Products"

  constructor(private http:HttpClient) { }

  public GetProducts() : Observable<Product[]> {
    return this.http.get<Product[]>((environment as any).apiUrl + this.url);
  }

  public UpdateProduct(product: Product): Observable<Product> {
    return this.http.put<Product>(
      `${(environment as any).apiUrl + this.url}/${product.id}`,
      product
    );
  }
}
