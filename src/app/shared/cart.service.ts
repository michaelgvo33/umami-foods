import { Injectable, signal } from '@angular/core';

export type CartCategory =
  | 'Arroz e Nori'
  | 'Molhos e Temperos'
  | 'Massas e Bases'
  | 'Utensilios'
  | 'Loucas e Servico'
  | 'Embalagens';

export type CartProduct = {
  id: number;
  nome: string;
  categoria: CartCategory;
  descricao: string;
  preco: number;
  imagem: string;
  destaque?: string;
};

export type CartItem = CartProduct & {
  quantidade: number;
};

const STORAGE_KEY = 'umami-carrinho';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  carrinho = signal<CartItem[]>(this.loadCart());
  carrinhoAberto = signal(false);

  get quantidadeItens(): number {
    return this.carrinho().reduce((total, item) => total + item.quantidade, 0);
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

  adicionarAoCarrinho(produto: CartProduct): void {
    const itens = [...this.carrinho()];
    const item = itens.find((produtoCarrinho) => produtoCarrinho.id === produto.id);

    if (item) {
      item.quantidade += 1;
    } else {
      itens.push({
        ...produto,
        quantidade: 1
      });
    }

    this.updateCart(itens);
    this.abrirCarrinho();
  }

  aumentarQuantidade(id: number): void {
    const itens = this.carrinho().map((item) =>
      item.id === id ? { ...item, quantidade: item.quantidade + 1 } : item
    );

    this.updateCart(itens);
  }

  diminuirQuantidade(id: number): void {
    const itens = this.carrinho()
      .map((item) =>
        item.id === id ? { ...item, quantidade: item.quantidade - 1 } : item
      )
      .filter((item) => item.quantidade > 0);

    this.updateCart(itens);
  }

  removerItem(id: number): void {
    const itens = this.carrinho().filter((item) => item.id !== id);
    this.updateCart(itens);
  }

  formatarPreco(valor: number): string {
    return valor.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    });
  }

  private loadCart(): CartItem[] {
    if (typeof localStorage === 'undefined') {
      return [];
    }

    const cart = localStorage.getItem(STORAGE_KEY);

    if (!cart) {
      return [];
    }

    try {
      return JSON.parse(cart) as CartItem[];
    } catch {
      return [];
    }
  }

  private updateCart(itens: CartItem[]): void {
    this.carrinho.set(itens);

    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(itens));
    }
  }
}
