import { Injectable } from '@angular/core';
import { Produto } from '../models/produto';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {
  private produtos: Produto[] = [
    { id: 1, nome: 'Arroz Japonês para Sushi 1kg', categoria: 'Arroz e Nori', descricao: 'Arroz de grão curto ideal para sushi.', preco: 14.9, imagem: 'img/arroz-sushi-1kg.jpg', destaque: 'Mais vendido' },
    { id: 2, nome: 'Arroz Japonês para Sushi 5kg', categoria: 'Arroz e Nori', descricao: 'Versão econômica para operações maiores.', preco: 62.9, imagem: 'img/arroz-sushi-5kg.jpg' },
    { id: 3, nome: 'Alga Nori 50 folhas', categoria: 'Arroz e Nori', descricao: 'Folhas selecionadas para sushi e temaki.', preco: 29.9, imagem: 'img/nori-50.jpg', destaque: 'Oferta' },
    { id: 4, nome: 'Alga Nori 100 folhas', categoria: 'Arroz e Nori', descricao: 'Pacote com alto rendimento para restaurantes.', preco: 54.9, imagem: 'img/nori-100.jpg' },
    { id: 5, nome: 'Furikake Tradicional', categoria: 'Arroz e Nori', descricao: 'Tempero seco japonês para finalização.', preco: 18.5, imagem: 'img/furikake.jpg' },
    { id: 6, nome: 'Shoyu Tradicional 1L', categoria: 'Molhos e Temperos', descricao: 'Molho de soja clássico para sushis e pratos quentes.', preco: 12.9, imagem: 'img/shoyu-1l.jpg' },
    { id: 7, nome: 'Shoyu Premium 1L', categoria: 'Molhos e Temperos', descricao: 'Versão premium com sabor mais refinado.', preco: 18.9, imagem: 'img/shoyu-premium.jpg' },
    { id: 8, nome: 'Molho Tare 500ml', categoria: 'Molhos e Temperos', descricao: 'Molho adocicado para finalização e grelhados.', preco: 16.9, imagem: 'img/tare.jpg' },
    { id: 9, nome: 'Vinagre de Arroz 500ml', categoria: 'Molhos e Temperos', descricao: 'Essencial para o preparo do arroz de sushi.', preco: 12.5, imagem: 'img/vinagre-arroz.jpg' },
    { id: 10, nome: 'Wasabi em Po 1kg', categoria: 'Molhos e Temperos', descricao: 'Prático para preparo de wasabi com otimo rendimento.', preco: 39.9, imagem: 'img/wasabi-po.jpg' },
    { id: 11, nome: 'Gengibre em Conserva 1kg', categoria: 'Molhos e Temperos', descricao: 'Acompanhamento clássico da culinária japonesa.', preco: 24.9, imagem: 'img/gengibre.jpg' },
    { id: 12, nome: 'Misso Pasta 500g', categoria: 'Molhos e Temperos', descricao: 'Base tradicional para sopas e molhos.', preco: 21.9, imagem: 'img/misso.jpg' },
    { id: 13, nome: 'Macarrão Udon 500g', categoria: 'Massas e Bases', descricao: 'Massa espessa oriental para pratos quentes.', preco: 14.5, imagem: 'img/udon.jpg' },
    { id: 14, nome: 'Macarrão Soba 300g', categoria: 'Massas e Bases', descricao: 'Massa tradicional de preparo rapido.', preco: 13.9, imagem: 'img/soba.jpg' },
    { id: 15, nome: 'Massa para Guioza 500g', categoria: 'Massas e Bases', descricao: 'Ideal para montagem de guiozas.', preco: 17.9, imagem: 'img/guioza.jpg' },
    { id: 16, nome: 'Panko 1kg', categoria: 'Massas e Bases', descricao: 'Farinha japonesa para empanados crocantes.', preco: 19.9, imagem: 'img/panko.jpg', destaque: 'Destaque' },
    { id: 17, nome: 'Tofu Firme 500g', categoria: 'Massas e Bases', descricao: 'Ingrediente vegetal versátil para receitas orientais.', preco: 15.9, imagem: 'img/tofu.jpg' },
    { id: 18, nome: 'Cogumelo Shimeji 200g', categoria: 'Massas e Bases', descricao: 'Ideal para pratos quentes e acompanhamentos.', preco: 11.9, imagem: 'img/shimeji.jpg' },
    { id: 19, nome: 'Esteira de Sushi Bamboo', categoria: 'Utensilios', descricao: 'Utensílio clássico para enrolar sushis.', preco: 18.9, imagem: 'img/esteira.jpg' },
    { id: 20, nome: 'Hangiri Tradicional', categoria: 'Utensilios', descricao: 'Recipiente de madeira para preparo do arroz.', preco: 129.9, imagem: 'img/hangiri.jpg' },
    { id: 21, nome: 'Espátula Shamoji', categoria: 'Utensilios', descricao: 'Espátula apropriada para misturar arroz.', preco: 16.9, imagem: 'img/shamoji.jpg' },
    { id: 22, nome: 'Faca Yanagiba', categoria: 'Utensilios', descricao: 'Faca japonesa para cortes finos e precisos.', preco: 249.9, imagem: 'img/yanagiba.jpg', destaque: 'Premium' },
    { id: 23, nome: 'Faca Deba', categoria: 'Utensilios', descricao: 'Faca robusta para preparos mais firmes.', preco: 219.9, imagem: 'img/deba.jpg' },
    { id: 24, nome: 'Pegador de Bamboo', categoria: 'Utensilios', descricao: 'Utensílio prático para montagem e serviço.', preco: 12.9, imagem: 'img/pegador.jpg' },
    { id: 25, nome: 'Prato Retangular Oriental', categoria: 'Loucas e Servico', descricao: 'Apresentação elegante para sushis e combinados.', preco: 34.9, imagem: 'img/prato-retangular.jpg' },
    { id: 26, nome: 'Molheira para Shoyu', categoria: 'Loucas e Servico', descricao: 'Peça compacta e funcional para molhos.', preco: 9.9, imagem: 'img/molheira.jpg' },
    { id: 27, nome: 'Suporte para Hashi', categoria: 'Loucas e Servico', descricao: 'Detalhe funcional para mesa e serviço.', preco: 8.5, imagem: 'img/suporte-hashi.jpg' },
    { id: 28, nome: 'Bowl Oriental Preto', categoria: 'Loucas e Servico', descricao: 'Ideal para lamen, don e acompanhamentos.', preco: 22.9, imagem: 'img/bowl.jpg' },
    { id: 29, nome: 'Embalagem Premium para Temaki', categoria: 'Embalagens', descricao: 'Embalagem prática para delivery com boa apresentação.', preco: 28.9, imagem: 'img/embalagem-temaki.jpg' },
    { id: 30, nome: 'Caixa Delivery para Sushi', categoria: 'Embalagens', descricao: 'Caixa resistente para combinados e porções.', preco: 32.9, imagem: 'img/caixa-delivery.jpg', destaque: 'Novo' }
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
