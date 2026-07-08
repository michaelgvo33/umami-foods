import { Component, inject, OnInit } from '@angular/core'; 
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

// Importação dos componentes visuais reaproveitáveis (Cards, Header, Footer e Lateral do Carrinho)
import { CartSidebarComponent } from '../../components/cart-sidebar/cart-sidebar';
import { FooterComponent } from '../../components/footer/footer';
import { HeaderComponent } from '../../components/header/header';
import { ProductCardComponent } from '../../components/product-card/product-card';

// Importação de modelos e serviços de dados
import { Produto } from '../../models/produto';
import { CartService } from '../../services/cart.service';
import { ProdutoService } from '../../services/produto.service';
import { HeroContent } from '../../interfaces/hero-content';
import { NavItem } from '../../interfaces/nav-item';

@Component({
  selector: 'app-produtos',
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent,
    FooterComponent,
    CartSidebarComponent,
    ProductCardComponent
  ],
  templateUrl: './produtos.html',
  styleUrl: './produtos.css'
})
export class Produtos implements OnInit {
  // Injeção de dependência dos serviços globais
  public readonly cartService = inject(CartService);
  private readonly produtoService = inject(ProdutoService);
  private readonly route = inject(ActivatedRoute);

  // Configurações estáticas de navegação e textos estruturais do layout (Hero Banner)
  readonly navItems: NavItem[] = [
    { label: 'Home', route: '/home' },
    { label: 'Produtos', route: '/produtos' },
    { label: 'Meu Perfil', route: '/perfil' },
    { label: 'Contato', route: '/contato' }
  ];

  readonly footerLinks: NavItem[] = this.navItems;

  readonly hero: HeroContent = {
    tag: 'Catálogo Umami Foods',
    title: 'Produtos orientais para restaurantes e pequenos negócios',
    description: 'Catálogo com ingredientes, utensílios e embalagens usados em operações de comida japonesa.'
  };

  // Lista fixa de categorias disponíveis no e-commerce
  readonly categorias: string[] = [
    'Todos',
    'Arroz e Nori',
    'Molhos e Temperos',
    'Massas e Bases',
    'Utensilios',
    'Loucas e Servico',
    'Embalagens'
  ];

  // Estados internos da tela (Variáveis de controle)
  categoriaSelecionada: string = 'Todos';
  produtoSelecionado: Produto | null = null; // Controla se o usuário clicou para ver os detalhes de um produto específico
  produtos: Produto[] = [];

  // CICLO DE VIDA DO COMPONENTE: Dispara assim que a tela abre
  ngOnInit(): void {
    // puxa os produtos dentro do banco de dados
    this.produtoService.getProdutos().subscribe({
      next: (dados: any[]) => {
        if (dados && dados.length > 0) {
          // organiza e mapeia eles
          this.mapearProdutos(dados);

          // se veio um produto específico pela URL (clique lá na Home), já abre o detalhe dele
          const idNaUrl = this.route.snapshot.queryParamMap.get('produto');
          if (idNaUrl) {
            const produtoDaUrl = this.produtos.find((p) => p.id === Number(idNaUrl));
            if (produtoDaUrl) {
              this.selecionarProduto(produtoDaUrl);
            }
          }
        }
      },
      error: (erro) => {
        console.error('Erro na carga do banco de dados relacional de produtos:', erro);
      }
    });
  }

  
  mapearProdutos(dados: any[]): void {
    this.produtos = dados.map((item, index) => { // map = mapeia os produtos 
      
      const idProduto = Number(item.produto_id || item.id || (index + 1));
      let categoriaDefinitiva = 'Arroz e Nori'; // prepara a organização 

      
      if (idProduto >= 1 && idProduto <= 5) {
        categoriaDefinitiva = 'Arroz e Nori';
      } else if (idProduto >= 6 && idProduto <= 12) {
        categoriaDefinitiva = 'Molhos e Temperos';
      } else if (idProduto >= 13 && idProduto <= 18) {
        categoriaDefinitiva = 'Massas e Bases';
      } else if (idProduto >= 19 && idProduto <= 24) {
        categoriaDefinitiva = 'Utensilios';
      } else if (idProduto >= 25 && idProduto <= 28) {
        categoriaDefinitiva = 'Loucas e Servico';
      } else if (idProduto >= 29 && idProduto <= 30) {
        categoriaDefinitiva = 'Embalagens';
      }

      // Construtor Automático de Caminho de Imagem (Ex: transforma ID 3 em "imagem_03.jpg")
      const numeroFormatado = idProduto < 10 ? `0${idProduto}` : `${idProduto}`;
      const extensao = idProduto === 2 ? 'png' : 'jpg'; // aceitar tanto png e jpg
      const nomeImagem = `imagem_${numeroFormatado}.${extensao}`;

      // Devolve o objeto perfeitamente padronizado e limpo de acordo com a interface do Front-End
      return {
        id: idProduto,
        nome: item.produto_name || item.nome,
        descricao: item.produto_descricao || item.descricao,
        preco: Number(item.produto_preco || item.preco || 0),
        imagem: `imagens/${nomeImagem}`,
        categoria: categoriaDefinitiva
      } as any;
    });
  }

  // Filtra a lista inteira de produtos em tempo de execução
  get produtosFiltrados(): Produto[] {
    if (this.categoriaSelecionada === 'Todos') {
      return this.produtos;
    }
    return this.produtos.filter(
      (produto) => produto && produto.categoria === this.categoriaSelecionada
    );
  }

  // NAVEGAÇÃO INTERNA: Cria a trilha de navegação (Breadcrumb) dinamicamente com base nas interações
  get breadcrumbItems(): any[] {
    const items = [
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

  // MÉTODOS DE FILTRO E SELEÇÃO DE INTERFACE
  selecionarCategoria(categoria: string): void {
    this.categoriaSelecionada = categoria;
    this.produtoSelecionado = null; // Reseta o detalhe do produto caso mude de categoria
  }

  selecionarProduto(produto: Produto): void {
    this.produtoSelecionado = produto;
    if (produto.categoria) {
      this.categoriaSelecionada = produto.categoria;
    }
  }

  voltarParaCatalogo(): void {
    this.produtoSelecionado = null;
  }

  // Gerencia cliques na trilha de migalhas (Breadcrumbs) para voltar telas
  onBreadcrumbClick(item: any): void {
    if (item.action === 'home' || item.action === 'produtos') {
      this.categoriaSelecionada = 'Todos';
      this.produtoSelecionado = null;
      return;
    }
    if (item.action === 'categoria') {
      this.produtoSelecionado = null;
    }
  }

  // PONTE DE MÉTODOS: Repassa ações visuais direto para o serviço global do carrinho
  formatarPreco(valor: number): string {
    return this.cartService.formatarPreco(valor);
  }

  adicionarAoCarrinho(produto: Produto): void {
    this.cartService.adicionarAoCarrinho(produto);
  }
}