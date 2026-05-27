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

  get carrinhoVazio(): boolean {
    return this.cartService.carrinho().length === 0; /* Verifica se o carrinho está vazio, retornando true se não houver itens e false caso contrário. */
  }

  get possuiItens(): boolean {
    return this.cartService.carrinho().length > 0; /* Verifica se o carrinho possui itens, retornando true se houver pelo menos um item e false se estiver vazio. */
  }

  getSubtotal(preco: number, quantidade: number): string {/* Calcula o subtotal (preço x quantidade) e formata o valor para exibição. */
    return this.cartService.formatarPreco(
      preco * quantidade
    );
  }
}