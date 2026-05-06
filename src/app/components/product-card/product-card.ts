import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Produto } from '../../models/produto';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-card.html',
  styleUrls: ['./product-card.css']
})
export class ProductCardComponent {
  @Input() produto!: Produto;
  @Input() precoAntigo?: number;
  @Input() buttonLabel = 'Adicionar ao carrinho';

  @Output() addToCart = new EventEmitter<Produto>();

  formatarPreco(valor: number): string {
    return valor.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    });
  }

  onAddToCart(): void {
    this.addToCart.emit(this.produto);
  }
}
