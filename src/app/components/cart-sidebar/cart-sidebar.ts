import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';

import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-cart-sidebar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart-sidebar.html',
  styleUrl: './cart-sidebar.css'
})
export class CartSidebarComponent {
  public readonly cartService = inject(CartService);
}