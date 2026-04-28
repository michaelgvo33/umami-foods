import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CartProduct, CartService } from '../shared/cart.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})
export class Home {
  constructor(public cartService: CartService) {}

  ofertas: CartProduct[] = [
    {
      id: 1,
      nome: 'Arroz Japones 1kg',
      categoria: 'Arroz e Nori',
      descricao: 'Ideal para preparos orientais com textura e rendimento consistentes.',
      preco: 14.9,
      imagem: 'arroz.jpg',
      destaque: '-15%'
    },
    {
      id: 3,
      nome: 'Alga Nori 50 folhas',
      categoria: 'Arroz e Nori',
      descricao: 'Folhas selecionadas para sushi, temaki e operacoes profissionais.',
      preco: 29.9,
      imagem: 'nori.jpg',
      destaque: 'Oferta'
    },
    {
      id: 9,
      nome: 'Vinagre de Arroz 500ml',
      categoria: 'Molhos e Temperos',
      descricao: 'Essencial para o preparo do arroz com sabor equilibrado e tradicional.',
      preco: 12.5,
      imagem: 'vinagre.jpg',
      destaque: '-10%'
    }
  ];

  precosAntigos: Record<number, number> = {
    1: 17.5,
    3: 34.9,
    9: 13.9
  };

  adicionarAoCarrinho(produto: CartProduct): void {
    this.cartService.adicionarAoCarrinho(produto);
  }
}
