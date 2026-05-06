import { Injectable, signal } from '@angular/core';
import { Usuario } from '../models/usuario';

const USUARIO_CADASTRADO_KEY = 'usuarioCadastrado';
const USUARIO_LOGADO_KEY = 'usuarioLogado';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  usuarioLogado = signal<Usuario | null>(this.getUsuarioLogadoStorage());

  cadastrar(usuario: Usuario): void {
    localStorage.setItem(USUARIO_CADASTRADO_KEY, JSON.stringify(usuario));
  }

  getUsuarioCadastrado(): Usuario | null {
    const usuario = localStorage.getItem(USUARIO_CADASTRADO_KEY);

    if (!usuario) {
      return null;
    }

    try {
      return JSON.parse(usuario) as Usuario;
    } catch {
      return null;
    }
  }

  login(email: string, senha: string): boolean {
    const usuario = this.getUsuarioCadastrado();

    if (!usuario) {
      return false;
    }

    const credenciaisValidas =
      usuario.email === email && usuario.senha === senha;

    if (credenciaisValidas) {
      localStorage.setItem(USUARIO_LOGADO_KEY, JSON.stringify(usuario));
      this.usuarioLogado.set(usuario);
      return true;
    }

    return false;
  }

  logout(): void {
    localStorage.removeItem(USUARIO_LOGADO_KEY);
    this.usuarioLogado.set(null);
  }

  isAutenticado(): boolean {
    return this.usuarioLogado() !== null;
  }

  getUsuarioLogado(): Usuario | null {
    return this.usuarioLogado();
  }

  private getUsuarioLogadoStorage(): Usuario | null {
    const usuario = localStorage.getItem(USUARIO_LOGADO_KEY);

    if (!usuario) {
      return null;
    }

    try {
      return JSON.parse(usuario) as Usuario;
    } catch {
      return null;
    }
  }
}
