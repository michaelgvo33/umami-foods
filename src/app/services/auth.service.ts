import { Injectable, signal } from '@angular/core';

import { Usuario } from '../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  readonly usuarioLogado = signal<Usuario | null>(null);

  private usuarioCadastrado: Usuario | null = null;

  cadastrar(usuario: Usuario): void {
    this.usuarioCadastrado = usuario;
  }

  login(email: string, senha: string): boolean {
    if (!this.usuarioCadastrado) {
      return false;
    }

    const loginValido =
      this.usuarioCadastrado.email === email &&
      this.usuarioCadastrado.senha === senha;

    if (!loginValido) {
      return false;
    }

    this.usuarioLogado.set(this.usuarioCadastrado);

    return true;
  }

  logout(): void {
    this.usuarioLogado.set(null);
  }

  isAutenticado(): boolean {
    return this.usuarioLogado() !== null;
  }
}