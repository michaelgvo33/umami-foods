import { Injectable, signal } from '@angular/core';

export type CartCategory =
  | 'Arroz e Nori'
  | 'Molhos e Temperos'
  | 'Massas e Bases'
  | 'Utensílios'
  | 'Louças e Serviço'
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
  readonly carrinho = signal<CartItem[]>(this.carregarCarrinho());
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

  adicionarAoCarrinho(produto: CartProduct): void {
    const itens = [...this.carrinho()];
    const itemEncontrado = itens.find((item) => item.id === produto.id); /* Find serve para verificar se o item já existe no carrinho atráves do ID */  

    if (itemEncontrado) {
      itemEncontrado.quantidade += 1;
    } else {
      itens.push({
        ...produto,
        quantidade: 1
      });
    }

    this.atualizarCarrinho(itens);
    this.abrirCarrinho();
  }

  aumentarQuantidade(id: number): void {
    const itens = this.carrinho().map((item) => /* Map serve para percorrer os itens do carrinho e atualizar somente o item selecionado. */
      item.id === id
        ? { ...item, quantidade: item.quantidade + 1 }
        : item
    );

    this.atualizarCarrinho(itens);
  }

  diminuirQuantidade(id: number): void {
    const itens = this.carrinho()
      .map((item) =>
        item.id === id
          ? { ...item, quantidade: item.quantidade - 1 }
          : item
      )
      .filter((item) => item.quantidade > 0);

    this.atualizarCarrinho(itens);
  }

  removerItem(id: number): void {
    const itens = this.carrinho().filter((item) => item.id !== id); /* Filter serve para remover o item do carrinho atráves do ID. Ele percorre os itens do carrinho e retorna somente os itens que não possuem o ID selecionado. */
    this.atualizarCarrinho(itens);
  }

  formatarPreco(valor: number): string {
    return valor.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    });
  }

  private carregarCarrinho(): CartItem[] {
    if (typeof localStorage === 'undefined') {
      return [];
    }

    const carrinhoSalvo = localStorage.getItem(STORAGE_KEY);

    if (!carrinhoSalvo) {
      return [];
    }

    try {
      return JSON.parse(carrinhoSalvo) as CartItem[];
    } catch {
      return [];
    }
  }

  private atualizarCarrinho(itens: CartItem[]): void {
    this.carrinho.set(itens);
    }
  }
