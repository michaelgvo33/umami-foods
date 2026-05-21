import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';

import { CartSidebarComponent } from '../../components/cart-sidebar/cart-sidebar';
import { FooterComponent } from '../../components/footer/footer';
import { HeaderComponent } from '../../components/header/header';

import { NavItem } from '../../interfaces/nav-item';
import { HeroContent } from '../../interfaces/hero-content';
import { Produto } from '../../models/produto';
import { CartService } from '../../services/cart.service';
import { ProdutoService } from '../../services/produto.service';

type Categoria = 'Todos' | Produto['categoria'];

type BreadcrumbItem = {
  label: string;
  action: 'home' | 'produtos' | 'categoria' | 'produto';
};

@Component({
  selector: 'app-produtos',
  standalone: true,
  imports: [CommonModule, HeaderComponent, FooterComponent, CartSidebarComponent],
  templateUrl: './produtos.html',
  styleUrl: './produtos.css'
})
export class Produtos {
  public readonly cartService = inject(CartService);
  private readonly produtoService = inject(ProdutoService);

  readonly navItems: NavItem[] = [
    { label: 'Home', route: '/home' },
    { label: 'Produtos', route: '/produtos' },
    { label: 'Contato', route: '/contato' }
  ];

  readonly footerLinks: NavItem[] = this.navItems;

  readonly hero: HeroContent = {
    tag: 'Catálogo Umami Foods',
    title: 'Produtos orientais para restaurantes e pequenos negócios',
    description:
      'Catálogo com ingredientes, utensílios e embalagens usados em operações de comida japonesa.'
  };

  readonly categorias: Categoria[] = [
    'Todos',
    'Arroz e Nori',
    'Molhos e Temperos',
    'Massas e Bases',
    'Utensilios',
    'Loucas e Servico',
    'Embalagens'
  ];

  categoriaSelecionada: Categoria = 'Todos';
  produtoSelecionado: Produto | null = null;

  readonly produtos: Produto[] = this.produtoService.getProdutos();

  get produtosFiltrados(): Produto[] {
    if (this.categoriaSelecionada === 'Todos') {
      return this.produtos;
    }

    return this.produtos.filter(
      (produto) => produto.categoria === this.categoriaSelecionada
    );
  }

  get breadcrumbItems(): BreadcrumbItem[] {
    const items: BreadcrumbItem[] = [
      { label: 'Home', action: 'home' },
      { label: 'Produtos', action: 'produtos' }
    ];

    if (this.categoriaSelecionada !== 'Todos') {
      items.push({
        label: this.categoriaSelecionada,
        action: 'categoria'
      });
    }

    if (this.produtoSelecionado) {
      items.push({
        label: this.produtoSelecionado.nome,
        action: 'produto'
      });
    }

    return items;
  }

  selecionarCategoria(categoria: Categoria): void {
    this.categoriaSelecionada = categoria;
    this.produtoSelecionado = null;
  }

  selecionarProduto(produto: Produto): void {
    this.produtoSelecionado = produto;
    this.categoriaSelecionada = produto.categoria;
  }

  voltarParaCatalogo(): void {
    this.produtoSelecionado = null;
  }

  onBreadcrumbClick(item: BreadcrumbItem): void {
    if (item.action === 'home' || item.action === 'produtos') {
      this.categoriaSelecionada = 'Todos';
      this.produtoSelecionado = null;
      return;
    }

    if (item.action === 'categoria') {
      this.produtoSelecionado = null;
    }
  }

  formatarPreco(valor: number): string {
    return this.cartService.formatarPreco(valor);
  }

  adicionarAoCarrinho(produto: Produto): void {
    this.cartService.adicionarAoCarrinho(produto);
  }
}