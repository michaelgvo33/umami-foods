import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';

import { Produto } from '../../models/produto';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-card.html',
  styleUrl: './product-card.css'
})
export class ProductCardComponent {

  @Input({ required: true }) /* Ele garante que o card receba as informações do produto sem dar erro. */
  produto!: Produto; /* O : Produto define o tipo dela, e o ! informa ao TypeScript que o Angular irá preencher essa informação depois através do Input. */

  @Input()
  precoAntigo?: number; /* cria a possibilidade de se fazer uma promoção, onde o preço antigo é exibido riscado ao lado do preço atual. */

  @Input()
  buttonLabel = 'Adicionar';

  @Output()
  addToCart = new EventEmitter<Produto>();

  get possuiDestaque(): boolean {
    return !!this.produto.destaque;
  }

  get possuiPrecoAntigo(): boolean {
    return !!this.precoAntigo;
  }

  get precoFormatado(): string {
    return this.formatarPreco(this.produto.preco);
  }

  get precoAntigoFormatado(): string {
    return this.formatarPreco(this.precoAntigo ?? 0);
  }

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