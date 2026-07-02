import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, catchError, of } from 'rxjs';
import { Usuario } from '../models/usuario';
import { API_CLIENTES } from '../api-config';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = API_CLIENTES; 

  // Sinal que guarda o usuário que está logado no sistema
  readonly usuarioLogado = signal<Usuario | null>(null);

  // Envia os dados do formulário para salvar no banco de dados
  cadastrar(usuario: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, usuario);
  }

  // Realiza o login varrendo a lista de clientes com um laço FOR tradicional
  login(email: string, senha: string): Observable<boolean> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      map(usuarios => {
        if (usuarios && usuarios.length > 0) {
          
          // Laço de repetição básico para procurar o e-mail digitado na lista do banco
          for (let i = 0; i < usuarios.length; i++) {
            const u = usuarios[i];
            const emailBate = u.cliente_email === email || u.email === email;
            const senhaBate = u.cliente_senha === senha || u.senha === senha;

            // Só libera o login se o e-mail E a senha baterem com o que está no banco
            if (emailBate && senhaBate) {
              this.usuarioLogado.set(u);
              return true; // Encontrou o usuário e autoriza o login
            }
          }

        }
        return false; // Não achou ninguém com esse e-mail/senha na lista
      }),
      catchError((erro) => {
        console.error('Erro na conexão com o servidor:', erro);
        this.usuarioLogado.set(null);
        return of(false); // Bloqueia o acesso caso a API falhe
      })
    );
  }

  // Remove o usuário do sistema para fazer o logout
  logout(): void {
    this.usuarioLogado.set(null);
  }

  // Verifica se existe alguma sessão ativa no momento
  isAutenticado(): boolean {
    return this.usuarioLogado() !== null;
  }
}