import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

import { Produto } from '../../models/produto';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-card.html',
  styleUrl: './product-card.css'
})
export class ProductCardComponent {
  @Input({ required: true }) produto!: Produto;

  @Input() precoAntigo?: number;

  @Input() buttonLabel = 'Adicionar';

  @Output() addToCart = new EventEmitter<Produto>();

  formatarPreco(valor: number): string {
    return valor.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    });
  }

  adicionarAoCarrinho(): void {
    this.addToCart.emit(this.produto);
  }
}