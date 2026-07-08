import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CartService } from '../../services/cart.service';
import { NavItem } from '../../interfaces/nav-item';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class HeaderComponent {
  public readonly authService = inject(AuthService);
  public readonly cartService = inject(CartService);

  readonly navItems: NavItem[] = [
    { label: 'Home', route: '/home' },
    { label: 'Produtos', route: '/produtos' },
    { label: 'Meu Perfil', route: '/perfil' },
    { label: 'Contato', route: '/contato' }
  ];

  // ADICIONADO: Método que resolve o erro TS2339 no HTML
  get nomeExibicao(): string {
    const usuario = this.authService.usuarioLogado() as any;
    if (!usuario) return '';

    // Pega o nome vindo do banco ou do mock de segurança
    const nomeCompleto = usuario.cliente_nome || usuario.nome || '';
    
    // Divide o texto por espaços em branco e junta apenas os 2 primeiros nomes
    const partes = nomeCompleto.split(' ');
    return partes.slice(0, 2).join(' ');
  }

  logout(): void {
    this.authService.logout();
  }
}
