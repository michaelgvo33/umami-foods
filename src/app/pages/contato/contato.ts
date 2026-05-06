import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HeaderComponent } from '../../components/header/header';
import { FooterComponent } from '../../components/footer/footer';
import { NavItem } from '../../interfaces/nav-item';
import { HeroContent } from '../../interfaces/hero-content';
import { FaqItem } from '../../interfaces/faq-item';
import { CanalContato } from '../../interfaces/canal-contato';
import { CampoFormulario } from '../../interfaces/campo-formulario';

@Component({
  selector: 'app-contato',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HeaderComponent, FooterComponent],
  templateUrl: './contato.html',
  styleUrls: ['./contato.css']
})
export class Contato {
  statusEnvio = signal<'normal' | 'sucesso' | 'erro'>('normal');

  navItems: NavItem[] = [
    { label: 'Home', route: '/home' },
    { label: 'Produtos', route: '/produtos' },
    { label: 'Contato', route: '/contato' }
  ];

  footerLinks: NavItem[] = [...this.navItems];

  hero: HeroContent = {
    tag: 'Fale com a Umami Foods',
    title: 'Canais de comunicação e atendimento',
    description:
      'Entre em contato com nossa equipe para tirar dúvidas, acompanhar pedidos, solicitar orcamentos ou resolver qualquer problema com maior rapidez.'
  };

  canais: CanalContato[] = [
    {
      titulo: 'WhatsApp Comercial',
      destaque: '(21) 99999-9999',
      descricao: 'Atendimento rápido para pedidos, cotações e suporte comercial.'
    },
    {
      titulo: 'E-mail',
      destaque: 'contato@umamifoods.com.br',
      descricao: 'Envie dúvidas, solicitações e informações sobre pedidos.'
    },
    {
      titulo: 'Horario de Atendimento',
      destaque: 'Seg a Sex, 08h as 18h',
      descricao: 'Nossa equipe comercial esta disponível em horário comercial.'
    }
  ];

  assuntos: string[] = [
    'Duvidas referente a entrega',
    'Problema com compra',
    'Acompanhar pedido',
    'Solicitacao de orcamento',
    'Informacoes sobre produtos',
    'Troca ou devolucao',
    'Problema no pagamento',
    'Cadastro de cliente',
    'Parceria comercial',
    'Reclamacao',
    'Sugestao',
    'Outros'
  ];

  faq: FaqItem[] = [
    {
      pergunta: 'Qual o prazo de entrega?',
      resposta: 'O prazo varia conforme a região e o volume do pedido. Nossa equipe confirma isso no atendimento.'
    },
    {
      pergunta: 'Vocês atendem empresas e restaurantes?',
      resposta: 'Sim. A Umami Foods atende restaurantes, mercados, operacoes de delivery e parceiros comerciais.'
    },
    {
      pergunta: 'Posso pedir orçamento antes de comprar?',
      resposta: 'Sim. Você pode solicitar um orcamento pelo formulario, WhatsApp ou e-mail.'
    },
    {
      pergunta: 'Como acompanho meu pedido?',
      resposta: 'Você pode falar com nosso atendimento informando nome, telefone ou numero do pedido.'
    },
    {
      pergunta: 'Vocês fazem troca em caso de problema?',
      resposta: 'Sim. Cada caso e analisado pela equipe para orientar troca, ajuste ou suporte adequado.'
    }
  ];

  camposFormulario: CampoFormulario[] = [
    { label: 'Nome', controlName: 'nome', type: 'text', placeholder: 'Digite seu nome' },
    { label: 'Email', controlName: 'email', type: 'email', placeholder: 'seu@email.com' },
    { label: 'Telefone', controlName: 'telefone', type: 'tel', placeholder: '(21) 99999-9999' },
    { label: 'Assunto', controlName: 'assunto', type: 'select' },
    { label: 'Mensagem', controlName: 'mensagem', type: 'textarea', placeholder: 'Escreva aqui sua mensagem', rows: 5 }
  ];

  form = new FormGroup({
    nome: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    telefone: new FormControl(''),
    assunto: new FormControl('', Validators.required),
    mensagem: new FormControl('', [Validators.required, Validators.minLength(10)])
  });

  enviarFormulario(): void {
    if (this.form.valid) {
      console.log('Mensagem enviada:', this.form.value);
      this.statusEnvio.set('sucesso');
      setTimeout(() => {
        this.form.reset();
        this.statusEnvio.set('normal');
      }, 2000);
    } else {
      this.statusEnvio.set('erro');
    }
  }
}
