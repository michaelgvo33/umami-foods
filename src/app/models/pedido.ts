import { Produto } from './produto';

export interface ItemPedido extends Produto {
  quantidade: number;
}

export interface Pedido {
  id: number;
  clienteNome: string;
  clienteEmail: string;
  itens: ItemPedido[];
  total: number;
  status: 'pendente' | 'confirmado' | 'em preparo' | 'enviado' | 'entregue';
  dataCriacao: string;
}
