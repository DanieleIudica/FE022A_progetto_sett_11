import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-navbar',
  template: `
    <nav class="navbar navbar-expand navbar-dark bg-dark">
      <div class="container-fluid ms-5">
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="navbar"
          aria-controls="navbar"
          aria-expanded="false"
          aria-label="Nascondi il menu"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbar">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item ms-5">
              <a
                class="nav-link"
                aria-current="page"
                [routerLink]="['/']"
                routerLinkActive="active"
                [routerLinkActiveOptions]="{ exact: true }"
                >Home</a
              >
            </li>
            <li class="nav-item ms-4">
              <a
                class="nav-link"
                aria-current="page"
                [routerLink]="['/cart']"
                routerLinkActive="active"
                >Carrello
                <span class="badge bg-success rounded-pill ms-2">
                  {{ total }}
                </span></a
              >
              >
            </li>
          </ul>
        </div>
      </div>
    </nav>
  `,
  styles: [],
})
export class NavbarComponent implements OnInit {
  total: number = 0;

  constructor(private cartSrv: CartService) {}

  ngOnInit(): void {
    this.cartSrv.counter.subscribe((count) => {
      this.total = count;
    });
  }
}
