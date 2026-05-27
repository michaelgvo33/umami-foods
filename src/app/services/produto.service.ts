import { Injectable } from '@angular/core';
import { Produto } from '../models/produto';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {
  private produtos: Produto[] = [
    { 
  id: 1,
  nome: 'Arroz Oriental Grão Curto Guin 1kg',
  categoria: 'Arroz e Nori',
  descricao: 'Arroz japonês premium de grão curto com alta aderência e textura ideal para sushi, temaki e pratos orientais. Possui cozimento uniforme e excelente rendimento para uso profissional.',
  preco: 32.9,
  imagem: 'arroz.jpg',
  destaque: 'Mais vendido'
},

{ 
  id: 2,
  nome: 'Arroz Oriental Grão Curto Guin 5kg',
  categoria: 'Arroz e Nori',
  descricao: 'Versão econômica indicada para restaurantes e operações maiores. Mantém textura macia, brilho característico e ótima absorção do tempero para sushi.',
  preco: 139.9,
  imagem: 'arroz5kg.png'
},

{ 
  id: 3,
  nome: 'Alga Nori Fukumatsu 50 Folhas Esmeralda',
  categoria: 'Arroz e Nori',
  descricao: 'Folhas selecionadas de alga nori com textura crocante e sabor equilibrado. Ideal para sushi, temaki e hossomaki.',
  preco: 64.9,
  imagem: 'nori.jpg',
  destaque: 'Oferta'
},

{ 
  id: 4,
  nome: 'Alga Nori Fukumatsu 100 Folhas Esmeralda',
  categoria: 'Arroz e Nori',
  descricao: 'Pacote profissional com 100 folhas de alga nori de alta qualidade, oferecendo excelente rendimento para restaurantes japoneses.',
  preco: 119.9,
  imagem: 'nori100f.jpg'
},

{ 
  id: 5,
  nome: 'Tempero Furikake Peixe Bonito com Alga 33g',
  categoria: 'Arroz e Nori',
  descricao: 'Tempero japonês tradicional à base de peixe bonito e algas marinhas. Ideal para finalizar arroz, poke, onigiri e pratos orientais.',
  preco: 24.9,
  imagem: 'furikake.jpg'
},

{ 
  id: 6,
  nome: 'Molho Sushi Sashimi Kikkoman 1L',
  categoria: 'Molhos e Temperos',
  descricao: 'Molho shoyu tradicional fermentado naturalmente, perfeito para sushi, sashimi e preparações quentes da culinária japonesa.',
  preco: 26.9,
  imagem: 'shoyu-1l.jpg'
},

{ 
  id: 7,
  nome: 'Molho Sakura Premium 1L',
  categoria: 'Molhos e Temperos',
  descricao: 'Shoyu premium com sabor mais refinado, equilíbrio ideal entre salgado e umami, indicado para restaurantes e chefs.',
  preco: 34.9,
  imagem: 'shoyu-premium.jpg'
},

{ 
  id: 8,
  nome: 'Molho Tarê Especial 1L',
  categoria: 'Molhos e Temperos',
  descricao: 'Molho agridoce japonês utilizado em hot rolls, grelhados, yakisoba e finalizações de pratos orientais.',
  preco: 29.9,
  imagem: 'tare.jpg'
},

{ 
  id: 9,
  nome: 'Vinagre de Arroz Orgânico 400ml',
  categoria: 'Molhos e Temperos',
  descricao: 'Vinagre de arroz suave e equilibrado, essencial para o preparo do arroz de sushi e marinadas japonesas.',
  preco: 22.9,
  imagem: 'vinagre-arroz.jpg'
},

{ 
  id: 10,
  nome: 'Wasabi em Pó Importado 1kg',
  categoria: 'Molhos e Temperos',
  descricao: 'Wasabi em pó importado com sabor intenso e excelente rendimento para restaurantes e operações profissionais.',
  preco: 89.9,
  imagem: 'wasabi-po.jpg'
},

{ 
  id: 11,
  nome: 'Gengibre em Conserva Fatiado 1kg',
  categoria: 'Molhos e Temperos',
  descricao: 'Gengibre japonês levemente adocicado e fatiado, ideal para acompanhar sushi e sashimi.',
  preco: 39.9,
  imagem: 'gengibre.jpg'
},

{ 
  id: 12,
  nome: 'Pasta Missô Aka 500g',
  categoria: 'Molhos e Temperos',
  descricao: 'Pasta de soja fermentada tradicional japonesa utilizada em sopas, molhos e marinadas.',
  preco: 32.9,
  imagem: 'misso.jpg'
},

{ 
  id: 13,
  nome: 'Macarrão Udon 500g',
  categoria: 'Massas e Bases',
  descricao: 'Massa oriental espessa e macia ideal para caldos quentes, yakiudon e pratos japoneses tradicionais.',
  preco: 19.9,
  imagem: 'udon.jpg'
},

{ 
  id: 14,
  nome: 'Macarrão Sobá Japonês 300g',
  categoria: 'Massas e Bases',
  descricao: 'Macarrão tradicional japonês de preparo rápido, perfeito para pratos frios ou quentes.',
  preco: 18.9,
  imagem: 'soba.jpg'
},

{ 
  id: 15,
  nome: 'Massa para Guioza 20 Folhas',
  categoria: 'Massas e Bases',
  descricao: 'Folhas prontas para preparo de guiozas artesanais com excelente elasticidade e resistência.',
  preco: 22.9,
  imagem: 'guioza.jpg'
},

{ 
  id: 16,
  nome: 'Farinha Panko 1kg',
  categoria: 'Massas e Bases',
  descricao: 'Farinha japonesa flocada que proporciona empanados extremamente crocantes e sequinhos.',
  preco: 29.9,
  imagem: 'panko.jpg',
  destaque: 'Destaque'
},

{ 
  id: 17,
  nome: 'Tofu Firme SoyVeg 500g',
  categoria: 'Massas e Bases',
  descricao: 'Tofu firme rico em proteína vegetal, ideal para receitas orientais, grelhados e pratos vegetarianos.',
  preco: 24.9,
  imagem: 'tofu.jpg'
},

{ 
  id: 18,
  nome: 'Cogumelo Shimeji 200g',
  categoria: 'Massas e Bases',
  descricao: 'Cogumelo fresco muito utilizado na culinária japonesa para yakisoba, teppan e acompanhamentos.',
  preco: 17.9,
  imagem: 'shimeji.jpg'
},

{ 
  id: 19,
  nome: 'Esteira De Sushi De Bambu 24x24',
  categoria: 'Utensilios',
  descricao: 'Esteira de bamboo fino utilizada para enrolar sushis e hot rolls com precisão e praticidade.',
  preco: 12.98,
  imagem: 'esteira.jpg'
},

{ 
  id: 20,
  nome: 'Hangiri de Madeira 39cm',
  categoria: 'Utensilios',
  descricao: 'Recipiente tradicional japonês utilizado para resfriar e temperar arroz de sushi profissionalmente.',
  preco: 249.9,
  imagem: 'hangiri.jpg'
},

{ 
  id: 21,
  nome: 'Espátula Shamoji',
  categoria: 'Utensilios',
  descricao: 'Espátula japonesa própria para misturar arroz sem danificar os grãos.',
  preco: 24.9,
  imagem: 'shamoji.jpg'
},

{ 
  id: 22,
  nome: 'Faca para Peixe Sushi Sashimi Yanagiba Japonesa ',
  categoria: 'Utensilios',
  descricao: 'Faca japonesa profissional de alta precisão para cortes finos de sashimi e sushi.',
  preco: 699.9,
  imagem: 'yanagiba.jpg',
  destaque: 'Premium'
},

{ 
  id: 23,
  nome: 'Faca Deba Seki Magoroku',
  categoria: 'Utensilios',
  descricao: 'Faca japonesa robusta desenvolvida para cortes mais firmes e limpeza de peixes.',
  preco: 489.9,
  imagem: 'deba.jpg'
},

{ 
  id: 24,
  nome: 'Pinça Culinária de Bambu 36cm',
  categoria: 'Utensilios',
  descricao: 'Pinça culinária resistente e prática para montagem, finalização e serviço de pratos.',
  preco: 22.9,
  imagem: 'pinca.jpg'
},

{ 
  id: 25,
  nome: 'Kit 6 Pratos Retangulares Orientais',
  categoria: 'Loucas e Servico',
  descricao: 'Pratos orientais elegantes ideais para apresentação de sushi, sashimi e combinados.',
  preco: 89.9,
  imagem: 'prato-retangular.jpg'
},

{ 
  id: 26,
  nome: 'Porta Shoyu Descartável 1000un',
  categoria: 'Loucas e Servico',
  descricao: 'Molheiras descartáveis práticas para delivery e operações de alto volume.',
  preco: 119.9,
  imagem: 'molheira.jpg'
},

{ 
  id: 27,
  nome: 'Suporte para Hashi Preto 500un',
  categoria: 'Loucas e Servico',
  descricao: 'Suporte funcional e elegante para hashi, trazendo organização e higiene para o serviço.',
  preco: 78.9,
  imagem: 'suporte-hashi.jpg'
},

{ 
  id: 28,
  nome: 'Kit 6 Bowls Orientais 350ml',
  categoria: 'Loucas e Servico',
  descricao: 'Bowls orientais resistentes ideais para lamen, missoshiro, donburi e acompanhamentos.',
  preco: 109.9,
 imagem: 'bowl.jpg'
},

{ 
  id: 29,
  nome: 'Embalagem para Temaki 1000un',
  categoria: 'Embalagens',
  descricao: 'Embalagem premium para delivery de temakis, garantindo proteção e ótima apresentação.',
  preco: 189.9,
 imagem: 'embalagem-temaki.jpg'
},

{ 
  id: 30,
  nome: 'Saco Kraft Oriental Delivery 100un',
  categoria: 'Embalagens',
  descricao: 'Saco kraft resistente e estilizado para delivery de sushi e pratos orientais.',
  preco: 69.9,
 imagem: 'caixa-delivery.jpg',
  destaque: 'Novo'
}
  ];
  getProdutos(): Produto[] {
    return this.produtos;
  }

  getProdutoPorId(id: number): Produto | undefined {
    return this.produtos.find((produto) => produto.id === id);
  }

  getProdutosPorCategoria(categoria: Produto['categoria']): Produto[] {
    return this.produtos.filter((produto) => produto.categoria === categoria);
  }

  getProdutosComDestaque(): Produto[] {
    return this.produtos.filter((produto) => !!produto.destaque);
  }
}
