import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HeaderComponent } from '../../components/header/header';
import { FooterComponent } from '../../components/footer/footer';
import { CartSidebarComponent } from '../../components/cart-sidebar/cart-sidebar';
import { ProductCardComponent } from '../../components/product-card/product-card';
import { CartService } from '../../services/cart.service';
import { Produto } from '../../models/produto';
import { NavItem } from '../../interfaces/nav-item';
import { HeroAction } from '../../interfaces/hero-action';
import { HeroContent } from '../../interfaces/hero-content';

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
  styleUrls: ['./home.css']
})
export class Home {
  constructor(public cartService: CartService) {}

  navItems: NavItem[] = [
    { label: 'Home', route: '/home' },
    { label: 'Produtos', route: '/produtos' },
    { label: 'Contato', route: '/contato' }
  ];

  footerLinks: NavItem[] = [...this.navItems];

  hero: HeroContent = {
    tag: 'Distribuidora de comida japonesa',
    title: 'Qualidade, frescor e confiança para o seu negócio',
    description:
      'Produtos orientais selecionados, entregas confiáveis e ofertas especiais para abastecer restaurantes, mercados e operações de delivery.'
  };

  heroActions: HeroAction[] = [
    {
      label: 'Ver Produtos',
      route: '/produtos',
      variant: 'primary'
    },
    {
      label: 'Falar Conosco',
      route: '/contato',
      variant: 'secondary'
    }
  ];

  ofertas: HomeOffer[] = [
    {
      id: 1,
      nome: 'Arroz Japonês 1kg',
      categoria: 'Arroz e Nori',
      descricao: 'Ideal para preparos orientais com textura e rendimento consistentes.',
      preco: 14.9,
      precoAntigo: 17.5,
      imagem: 'arroz.jpg',
      destaque: '-15%'
    },
    {
      id: 3,
      nome: 'Alga Nori 50 folhas',
      categoria: 'Arroz e Nori',
      descricao: 'Folhas selecionadas para sushi, temaki e operações profissionais.',
      preco: 29.9,
      precoAntigo: 34.9,
      imagem: 'nori.jpg',
      destaque: 'Oferta'
    },
    {
      id: 9,
      nome: 'Vinagre de Arroz 500ml',
      categoria: 'Molhos e Temperos',
      descricao: 'Essencial para o preparo do arroz com sabor equilibrado e tradicional.',
      preco: 12.5,
      precoAntigo: 13.9,
      imagem: 'vinagre.jpg',
      destaque: '-10%'
    }
  ];

  beneficios: BenefitItem[] = [
    {
      title: 'Entrega confiável',
      description: 'Atendimento rápido e distribuição organizada para operações comerciais.'
    },
    {
      title: 'Produtos selecionados',
      description: 'Catálogo pensado para restaurantes, mercados e negócios orientais.'
    },
    {
      title: 'Suporte comercial',
      description: 'Equipe preparada para pedidos, reposição, orçamentos e acompanhamento.'
    }
  ];

  adicionarAoCarrinho(produto: Produto): void {
    this.cartService.adicionarAoCarrinho(produto);
  }
}
