import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Produto } from '../../models/produto';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-card.html',
  styleUrl: './product-card.css'
})
export class ProductCardComponent {
  // Injeta o serviço para usar a formatação de preço padrão do site
  public readonly cartService = inject(CartService);

  @Input({ required: true }) 
  produto!: Produto;

  @Input()
  buttonLabel = 'Adicionar ao carrinho';

  @Output()
  addToCart = new EventEmitter<Produto>();

  // Consome a formatação centralizada do seu serviço de carrinho
  get precoFormatado(): string {
    return this.cartService.formatarPreco(this.produto.preco);
  }

  // Dispara o evento nativo para a Home ou página de Produtos capturarem
  adicionarAoCarrinho(): void {
    this.addToCart.emit(this.produto);
  }
}
