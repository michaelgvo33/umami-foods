import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_BASE_URL } from '../api-config';

// Define que esta classe é um serviço global (Injeção de Dependência)
@Injectable({
  providedIn: 'root'
})
export class ProdutoService {
  // Injeção moderna do Angular para habilitar requisições HTTP (GET, POST, etc.)
  private readonly http = inject(HttpClient);
  
  // Link direto da API do Senac que se conecta ao Banco de Dados MySQL
  private readonly apiUrl = `${API_BASE_URL}/produtos`;

  // 1. BUSCAR TODOS OS PRODUTOS
  // Faz um comando GET na API para listar todos os pratos de comida japonesa do banco
  getProdutos(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  // 2. BUSCAR PRODUTO POR ID
  
  getProdutoPorId(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  // 3. BUSCAR PRODUTOS POR CATEGORIA
  getProdutosPorCategoria(categoria: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/produtos/categoria/${categoria}`);
  }
}