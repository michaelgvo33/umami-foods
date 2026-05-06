import { Injectable, signal } from '@angular/core';
import { Produto } from '../models/produto';

export interface CartItem extends Produto {
  quantidade: number;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  carrinho = signal<CartItem[]>([]);
  carrinhoAberto = signal(false);

  get quantidadeItens(): number {
    return this.carrinho().reduce(
      (total: number, item: CartItem) => total + item.quantidade,
      0
    );
  }

  get totalCarrinho(): number {
    return this.carrinho().reduce(
      (total: number, item: CartItem) => total + item.preco * item.quantidade,
      0
    );
  }

  abrirCarrinho(): void {
    this.carrinhoAberto.set(true);
  }

  fecharCarrinho(): void {
    this.carrinhoAberto.set(false);
  }

  adicionarAoCarrinho(produto: Produto): void {
    const itens = [...this.carrinho()];
    const itemExistente = itens.find((item: CartItem) => item.id === produto.id);

    if (itemExistente) {
      itemExistente.quantidade += 1;
    } else {
      itens.push({
        ...produto,
        quantidade: 1
      });
    }

    this.carrinho.set(itens);
    this.carrinhoAberto.set(true);
  }

  aumentarQuantidade(id: number): void {
    this.carrinho.set(
      this.carrinho().map((item: CartItem) =>
        item.id === id ? { ...item, quantidade: item.quantidade + 1 } : item
      )
    );
  }

  diminuirQuantidade(id: number): void {
    this.carrinho.set(
      this.carrinho()
        .map((item: CartItem) =>
          item.id === id ? { ...item, quantidade: item.quantidade - 1 } : item
        )
        .filter((item: CartItem) => item.quantidade > 0)
    );
  }

  removerItem(id: number): void {
    this.carrinho.set(
      this.carrinho().filter((item: CartItem) => item.id !== id)
    );
  }

  formatarPreco(valor: number): string {
    return valor.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    });
  }
}
