import { Component, OnInit } from '@angular/core';
import { Product } from '../interface/product'; //interface
import { CartService } from '../services/cart.service'; //services
import { ProductsService } from '../services/products.service'; //services
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-details',
  template: `
    <div class="card mx-auto mt-4 " style="width: 18rem;">
      <h3 class="text-center">Dettagli Prodotto:</h3>
      <div class="card-body">
        <img src="{{ myProd.prod_url }}" class="card-img-top" />
        <h5 class="card-title">{{ myProd.name }}</h5>
        <p class="card-text">{{ myProd.price | currency: 'EUR' }}</p>
        <p class="card-text">{{ myProd.description }}</p>
        <button class="btn btn-dark" (click)="addToCart()">
          Aggiungi al carrello
        </button>
      </div>
    </div>
  `,
  styles: [],
})
export class DetailsComponent implements OnInit {
  myProd!: Product;

  constructor(
    private prodSrv: ProductsService,
    private cartSrv: CartService,
    private router: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.router.params.subscribe(async (params) => {
      const id = +params['id'];
      this.prodSrv.getDetails(id).subscribe((prod) => {
        this.myProd = prod;
      });
    });
  }

  addToCart() {
    this.cartSrv.addProd(this.myProd as Product);
    this.cartSrv.cartCounter();
  }
}
