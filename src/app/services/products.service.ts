import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../interface/product'; // interface
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  // host from thunder client
  baseUrl = 'http://localhost:4201';

  sub: Subject<Product[]> = new Subject();

  constructor(private http: HttpClient) {}
  //  to get all the products
  getProducts() {
    return this.http.get<Product[]>(`${this.baseUrl}/products`);
  }

  //  to get a single product sorted by id
  getDetails(id: number) {
    return this.http.get<Product>(`${this.baseUrl}/products/${id}`);
  }
}
