import { Injectable, signal } from '@angular/core';

import { Produto } from '../models/produto';

export interface CartItem extends Produto {
  quantidade: number;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  readonly carrinho = signal<CartItem[]>([]);
  readonly carrinhoAberto = signal(false);

  get quantidadeItens(): number {
    return this.carrinho().reduce(
      (total, item) => total + item.quantidade,
      0
    );
  }

  get totalCarrinho(): number {
    return this.carrinho().reduce(
      (total, item) => total + item.preco * item.quantidade,
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
    const itemExistente = itens.find((item) => item.id === produto.id);

    if (itemExistente) {
      itemExistente.quantidade += 1;
    } else {
      itens.push({
        ...produto,
        quantidade: 1
      });
    }

    this.carrinho.set(itens);
    this.abrirCarrinho();
  }

  aumentarQuantidade(id: number): void {
    const itens = this.carrinho().map((item) =>
      item.id === id
        ? { ...item, quantidade: item.quantidade + 1 }
        : item
    );

    this.carrinho.set(itens);
  }

  diminuirQuantidade(id: number): void {
    const itens = this.carrinho()
      .map((item) =>
        item.id === id
          ? { ...item, quantidade: item.quantidade - 1 }
          : item
      )
      .filter((item) => item.quantidade > 0);

    this.carrinho.set(itens);
  }

  removerItem(id: number): void {
    const itens = this.carrinho().filter((item) => item.id !== id);
    this.carrinho.set(itens);
  }

  formatarPreco(valor: number): string {
    return valor.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    });
  }
}