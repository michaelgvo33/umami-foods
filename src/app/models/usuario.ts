export interface Usuario {
  cliente_id?: number; 
  cliente_nome: string;
  cliente_email: string;
  cliente_senha: string;
  cliente_telefone: string;
  cliente_cnpj: string | null; 
  cliente_cpf: string;
  cliente_tipo_id: number; 
  cliente_status: number; 

}
