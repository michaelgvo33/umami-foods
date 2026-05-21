import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';

import { CartSidebarComponent } from '../../components/cart-sidebar/cart-sidebar';
import { FooterComponent } from '../../components/footer/footer';
import { HeaderComponent } from '../../components/header/header';
import { ProductCardComponent } from '../../components/product-card/product-card';

import { Produto } from '../../models/produto';
import { CartService } from '../../services/cart.service';
import { HeroAction } from '../../interfaces/hero-action';
import { HeroContent } from '../../interfaces/hero-content';
import { NavItem } from '../../interfaces/nav-item';

type HomeOffer = Produto & {
  precoAntigo: number;
};

type BenefitItem = {
  title: string;
  description: string;
};

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    HeaderComponent,
    FooterComponent,
    CartSidebarComponent,
    ProductCardComponent
  ],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {
  public readonly cartService = inject(CartService);

  readonly navItems: NavItem[] = [
    { label: 'Home', route: '/home' },
    { label: 'Produtos', route: '/produtos' },
    { label: 'Contato', route: '/contato' }
  ];

  readonly footerLinks: NavItem[] = this.navItems;

  readonly hero: HeroContent = {
    tag: 'Distribuidora de produtos orientais',
    title: 'Ingredientes para restaurantes, mercados e deliveries',
    description:
      'A Umami Foods trabalha com produtos secos e embalados da culinária japonesa, atendendo pequenos negócios que precisam repor o estoque com praticidade.'
  };

  readonly heroActions: HeroAction[] = [
    {
      label: 'Ver catálogo',
      route: '/produtos',
      variant: 'primary'
    },
    {
      label: 'Entrar em contato',
      route: '/contato',
      variant: 'secondary'
    }
  ];

  readonly ofertas: HomeOffer[] = [
    {
      id: 1,
      nome: 'Arroz Japonês 1kg',
      categoria: 'Arroz e Nori',
      descricao: 'Produto usado no preparo de sushi, temaki e pratos orientais.',
      preco: 14.9,
      precoAntigo: 17.5,
      imagem: 'arroz.jpg',
      destaque: '-15%'
    },
    {
      id: 3,
      nome: 'Alga Nori 50 folhas',
      categoria: 'Arroz e Nori',
      descricao: 'Pacote com folhas de nori para uso em restaurantes e deliveries.',
      preco: 29.9,
      precoAntigo: 34.9,
      imagem: 'nori.jpg',
      destaque: 'Oferta'
    },
    {
      id: 9,
      nome: 'Vinagre de Arroz 500ml',
      categoria: 'Molhos e Temperos',
      descricao: 'Indicado para temperar arroz japonês e outros preparos da cozinha oriental.',
      preco: 12.5,
      precoAntigo: 13.9,
      imagem: 'vinagre.jpg',
      destaque: '-10%'
    }
  ];

  readonly beneficios: BenefitItem[] = [
    {
      title: 'Catálogo objetivo',
      description: 'Produtos organizados por categoria para facilitar a consulta.'
    },
    {
      title: 'Foco em pequenos negócios',
      description: 'Atendimento pensado para restaurantes, mercados e operações de delivery.'
    },
    {
      title: 'Pedido simplificado',
      description: 'O cliente consegue visualizar os itens e montar uma lista de compra.'
    }
  ];

  adicionarAoCarrinho(produto: Produto): void {
    this.cartService.adicionarAoCarrinho(produto);
  }
}