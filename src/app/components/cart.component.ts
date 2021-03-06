import { Component, OnInit } from '@angular/core';
import { Product } from '../interface/product'; //interface
import { CartService } from '../services/cart.service'; //services
import {
  FormControl,
  FormGroup,
  Validators,
  FormBuilder,
} from '@angular/forms'; // reactive form

@Component({
  selector: 'app-cart',
  template: `
    <div class="container mt-3 w-75 mx-auto">
      <div *ngIf="prodList.length > 0; else empty">
        <h5>Articoli</h5>
        <ul class="list-group mb-3">
          <li
            class="list-group-item"
            *ngFor="let item of prodList; let i = index"
          >
            <span class="fw-bold">{{ item.name }}</span> -
            {{ item.description }}
            <span class="badge bg-dark rounded-pill float-end">
              {{ item.price | currency }}
            </span>
          </li>
        </ul>
        <!-- form -->
        <form [formGroup]="buyForm">
          <div class="form-group mt-4" formGroupName="uInfo">
            <h5>
              Completa ordine ora:
              <i>{{ today | date: 'EEEE dd MMMM yyyy' }}</i> , spedizioni in 24h
            </h5>
            <label class="col-sm-2 col-form-label">Nome:</label>
            <div class="col-sm-12">
              <input
                type="text"
                class="form-control"
                formControlName="uName"
                placeholder="Inserisci nome"
                required
              />
            </div>
            <label class="col-sm-2 col-form-label">Email:</label>
            <div class="col-sm-12">
              <input
                type="email"
                class="form-control"
                formControlName="uEmail"
                placeholder="Inserisci email valida"
                required
                email
              />
            </div>
            <div class="form-group w-100">
              <label class="col-sm-2 col-form-label">Indirizzo:</label>
              <div class="col-sm-12">
                <input
                  type="text"
                  class="form-control"
                  formControlName="uAddress"
                  placeholder="Inserisci indirizzo"
                  required
                />
              </div>
            </div>
            <!-- disabled btn if invalid form -->
            <button
              type="submit"
              class="btn btn-dark mt-3 col-sm-12"
              [disabled]="buyForm.invalid"
              (click)="submit()"
            >
              Invia
            </button>
          </div>
        </form>
      </div>
    </div>
    <!-- if empty cart -->
    <ng-template #empty>
      <div class="d-flex justify-content-center mt-5">
        <h3>Il carrello ?? vuoto.</h3>
      </div>
    </ng-template>
  `,
  styles: [
    `
      input.ng-invalid {
        border-left: 7px solid rgba(255, 0, 0, 0.5);
      }
      input.ng-valid {
        border-left: 7px solid rgba(0, 128, 0, 0.5);
      }
      i {
        color: green;
      }
    `,
  ],
})
export class CartComponent implements OnInit {
  prodList!: Product[];
  today = new Date(); // I imported the local date and currency in appModule
  buyForm!: FormGroup;

  constructor(private cartSrv: CartService, private fb: FormBuilder) {}

  ngOnInit(): void {
    /**
     * view cart
     */
    this.prodList = this.cartSrv.viewCart();

    /**
     * form controls
     */
    this.buyForm = this.fb.group({
      uInfo: this.fb.group({
        uName: this.fb.control('', [Validators.required]),
        uEmail: this.fb.control('', [Validators.required]),
        uAddress: this.fb.control('', [Validators.required]),
      }),
    });
  }

  /**
   * form submit
   */
  submit() {
    this.cartSrv.emptyCart();
    this.prodList = [];
    this.buyForm.reset();
  }
}
