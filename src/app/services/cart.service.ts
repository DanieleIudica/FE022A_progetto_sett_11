import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Product } from '../interface/product';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  cart: Product[] = [];
  counter = new Subject<number>();
  counterNum = 0;

  constructor() {}

  viewCart() {
    return this.cart;
  }

  addProd(prod: Product) {
    this.cart = [...this.cart, prod];
    this.counter.next(this.cart.length);
  }

  emptyCart() {
    this.cart = [];
    this.counter.next(0);
    this.counterNum = 0;
  }

  cartCounter() {
    this.counterNum++;
    this.counter.next(this.counterNum);
  }
}
