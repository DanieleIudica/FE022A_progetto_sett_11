import { Component, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { Product } from "../interface/product";
import { ProductsService } from "../services/products.service";

@Component({
  selector: "app-home",
  template: `
    <div class="container mt-2">
      <h1 class="text-center">Simulazione Ecommerce</h1>
      <div class="d-flex flex-md-row flex-column flex-wrap mt-4 mx-5 gap-2">
        <div *ngIf="loading" class="spinner-border d-flex mx-auto" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
        <div class="card" style="width: 18rem;" *ngFor="let item of prodList; let i = index">
          <img src="{{ item.prod_url }}" class="card-img-top" />
          <div class="card-body">
            <h5 class="card-title">{{ item.name }}</h5>
            <p class="card-text">{{ item.description }}</p>

            <a [routerLink]="['products/', item.id]" type="button" class="btn btn-dark">Dettagli</a>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [],
})
export class HomeComponent implements OnInit {
  // products list, type of Product
  prodList: Product[] | undefined;
  loading: boolean = false;
  sub!: Subscription;

  constructor(private prodSrv: ProductsService) {}

  ngOnInit(): void {
    this.loading = true;
    this.sub = this.prodSrv.getProducts().subscribe((list) => {
      this.prodList = list;
      this.loading = false;
    });
  }
}
