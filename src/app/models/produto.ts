export type CategoriaProduto =
  | 'Arroz e Nori'
  | 'Molhos e Temperos'
  | 'Massas e Bases'
  | 'Utensilios'
  | 'Loucas e Servico'
  | 'Embalagens';

export interface Produto {
  id: number;
  nome: string;
  categoria: CategoriaProduto;
  descricao: string;
  preco: number;
  imagem: string;
  destaque?: string;
}
