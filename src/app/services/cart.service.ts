import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Produto } from '../models/produto'; // Importação do modelo correto do projeto
import { AuthService } from './auth.service';
import { API_PEDIDOS} from '../api-config';

// Interface que estende o modelo de Produto adicionando o controle de quantidade
export interface CartItem extends Produto {
  quantidade: number;
}

const STORAGE_KEY = 'umami-carrinho';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private readonly http = inject(HttpClient);
  private readonly authService = inject(AuthService);

 
  private readonly apiPedidosUrl = API_PEDIDOS;

  // Carrega o carrinho
  readonly carrinho = signal<CartItem[]>(this.carregarCarrinho());
  readonly carrinhoAberto = signal(false);

  // Diz se o produto foi enviado para o banco ou não 
  readonly statusPedido = signal<'normal' | 'sucesso' | 'erro'>('normal');

  
  get quantidadeItens(): number {
    let total = 0;
    for (const item of this.carrinho()) {
      total += item.quantidade;
    }
    return total;
  }

  get totalCarrinho(): number {
    let total = 0;
    for (const item of this.carrinho()) {
      total += item.preco * item.quantidade;
    }
    return total;
  }

  get frete(): number {
    return 5; // Taxa de entrega fixa
  }

  get totalComFrete(): number {
    return this.totalCarrinho + this.frete;
  }

  // MÉTODOS DE INTERFACE
  abrirCarrinho(): void {
    this.statusPedido.set('normal');
    this.carrinhoAberto.set(true);
  }

  fecharCarrinho(): void {
    this.carrinhoAberto.set(false);
  }

  // GERENCIAMENTO DOS ITENS
  adicionarAoCarrinho(produto: Produto): void {
    const itens = [...this.carrinho()];
    const itemExistente = itens.find((item) => item.id === produto.id);

    if (itemExistente) {
      itemExistente.quantidade += 1;
    } else {
      itens.push({ ...produto, quantidade: 1 });
    }

    this.salvarEAtualizar(itens);
    this.abrirCarrinho();
  }

  aumentarQuantidade(id: number): void {
    const itens = this.carrinho().map((item) =>
      item.id === id ? { ...item, quantidade: item.quantidade + 1 } : item
    );
    this.salvarEAtualizar(itens);
  }

  diminuirQuantidade(id: number): void {
    const itens = this.carrinho()
      .map((item) => (item.id === id ? { ...item, quantidade: item.quantidade - 1 } : item))
      .filter((item) => item.quantidade > 0);
    this.salvarEAtualizar(itens);
  }

  removerItem(id: number): void {
    const itens = this.carrinho().filter((item) => item.id !== id);
    this.salvarEAtualizar(itens);
  }

  formatarPreco(valor: number): string {
    return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  }

   // procura o id do usuário logado para que na hora que o pedido seja enviado ele armaze o id do usuario no banco 
  finalizarPedido(): void {
    const usuario = this.authService.usuarioLogado() as any;

    // sem login não dá pra saber de quem é o pedido, então barra aqui mesmo
    if (!usuario) {
      this.statusPedido.set('erro');
      return;
    }

    const idDoClienteLogado = usuario?.cliente_id || usuario?.id || 1;

 // armazena os dados do pedido 
    const payloadBancoDados = {
      pedido_cliente_id: Number(idDoClienteLogado),
      pedido_total: Number(this.totalComFrete),
      pedido_status: 'Processando',
      pedido_data: new Date().toISOString().substring(0, 10) // para gerar no formato (AAAA-MM-DD)
    };

   

    // envia os dados para o banco de dados 
    this.http.post<any>(this.apiPedidosUrl, payloadBancoDados).subscribe({
      next: (resposta) => {
        console.log('Pedido registrado com sucesso real no MySQL:', resposta);
        this.statusPedido.set('sucesso');
        this.limparCarrinhoAposVenda();
      },
      error: (erro) => {
        console.error('Não foi possível registrar o pedido:', erro);
      }
    });
  }

  // MÉTODOS DE PERSISTÊNCIA LOCAL (LOCALSTORAGE)
  private limparCarrinhoAposVenda(): void {
    this.carrinho.set([]);
    if (typeof localStorage !== 'undefined') {
      localStorage.removeItem(STORAGE_KEY);
    }
    setTimeout(() => { this.fecharCarrinho(); }, 3000);
  }

  // visualiza se tem algo no localstorage de outro acesso 
  private carregarCarrinho(): CartItem[] {
    if (typeof localStorage === 'undefined') return [];
    const salvo = localStorage.getItem(STORAGE_KEY);
    if (!salvo) return [];
    try { return JSON.parse(salvo); } catch { return []; }
  }
  // atualiza o site rapidamente qnd o cliente adciona, remove ou coloca outro produto
  private salvarEAtualizar(itens: CartItem[]): void {
    this.carrinho.set(itens);
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(itens));
    }
  }
}