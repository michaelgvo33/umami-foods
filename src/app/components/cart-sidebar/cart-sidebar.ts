import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-cart-sidebar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart-sidebar.html',
  styleUrls: ['./cart-sidebar.css']
})
export class CartSidebarComponent {
  constructor(public cartService: CartService) {}
}
