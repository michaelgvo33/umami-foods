import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header';
import { FooterComponent } from '../../components/footer/footer';
import { CartSidebarComponent } from '../../components/cart-sidebar/cart-sidebar';
import { CartService } from '../../services/cart.service';
import { ProdutoService } from '../../services/produto.service';
import { Produto } from '../../models/produto';
import { NavItem } from '../../interfaces/nav-item';
import { HeroContent } from '../../interfaces/hero-content';

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
  styleUrls: ['./produtos.css']
})
export class Produtos {
  constructor(
    public cartService: CartService,
    private produtoService: ProdutoService
  ) {
    this.produtos = this.produtoService.getProdutos();
  }

  navItems: NavItem[] = [
    { label: 'Home', route: '/home' },
    { label: 'Produtos', route: '/produtos' },
    { label: 'Contato', route: '/contato' }
  ];

  footerLinks: NavItem[] = [...this.navItems];

  hero: HeroContent = {
    tag: 'Catalogo Umami Foods',
    title: 'Produtos japoneses para uma operacao profissional',
    description:
      'Ingredientes, utensilios, loucas e embalagens com a identidade visual, qualidade e praticidade que combinam com a Umami Foods.'
  };

  categorias: Categoria[] = [
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
  produtos: Produto[] = [];

  get produtosFiltrados(): Produto[] {
    if (this.categoriaSelecionada === 'Todos') {
      return this.produtos;
    }

    return this.produtos.filter((produto) => produto.categoria === this.categoriaSelecionada);
  }

  get breadcrumbItems(): BreadcrumbItem[] {
    const items: BreadcrumbItem[] = [
      { label: 'Home', action: 'home' },
      { label: 'Produtos', action: 'produtos' }
    ];

    if (this.categoriaSelecionada !== 'Todos') {
      items.push({ label: this.categoriaSelecionada, action: 'categoria' });
    }

    if (this.produtoSelecionado) {
      items.push({ label: this.produtoSelecionado.nome, action: 'produto' });
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
    if (item.action === 'produtos') {
      this.categoriaSelecionada = 'Todos';
      this.produtoSelecionado = null;
    }

    if (item.action === 'categoria') {
      this.produtoSelecionado = null;
    }
  }

  formatarPreco(valor: number): string {
    return this.cartService.formatarPreco(valor);
  }
}
