import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { HeaderComponent } from '../../components/header/header';
import { FooterComponent } from '../../components/footer/footer';
import { NavItem } from '../../interfaces/nav-item';
import { AuthService } from '../../services/auth.service'; 

interface UsuarioPerfil {
  nome: string;
  email: string;
  cpf: string;
  telefone: string;
  dataCadastro: string;
}

@Component({
  selector: 'app-meu-perfil',
  standalone: true,
  imports: [CommonModule, RouterLink, HeaderComponent, FooterComponent],
  templateUrl: './meu-perfil.html',
  styleUrl: './meu-perfil.css'
})
export class PerfilComponent implements OnInit {
  public readonly authService = inject(AuthService);

  readonly navItems: NavItem[] = [
    { label: 'Home', route: '/home' },
    { label: 'Produtos', route: '/produtos' },
    { label: 'Contato', route: '/contato' }
  ];
  readonly footerLinks: NavItem[] = this.navItems;

  usuario: UsuarioPerfil = {
    nome: '',
    email: '',
    cpf: '',
    telefone: '',
    dataCadastro: ''
  };

  ngOnInit(): void {
    this.carregarDadosDoBanco();
  }

  carregarDadosDoBanco(): void {
    const dadosBanco = this.authService.usuarioLogado() as any;

    if (dadosBanco) {
      // Cria a data de hoje formatada como plano de contingência visual
      const dataDeHoje = new Date().toLocaleDateString('pt-BR');

      // MAPEAMENTO ADAPTADO PARA AS PROPRIEDADES DA SUA TABELA DO BANCO
      this.usuario = {
        nome: dadosBanco.cliente_nome || dadosBanco.nome || 'Não informado',
        email: dadosBanco.cliente_email || dadosBanco.email || 'Não informado',
        cpf: dadosBanco.cliente_cpf || dadosBanco.cpf || 'Não informado',
        telefone: dadosBanco.cliente_telefone || dadosBanco.telefone || 'Não informado',
        
        // caso o banco falhe em fornecer a data de cadastro, usamos a data de hoje como fallback
        dataCadastro: dadosBanco.cliente_data || dadosBanco.data || dadosBanco.criado_em || dataDeHoje
      };
    } else {
      this.usuario = {
        nome: 'Visitante Não Autenticado',
        email: 'Faça login para ver seus dados',
        cpf: '-',
        telefone: '-',
        dataCadastro: '-'
      };
    }
  }
}
