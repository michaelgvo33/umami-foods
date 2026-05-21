import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import { FooterComponent } from '../../components/footer/footer';
import { HeaderComponent } from '../../components/header/header';

import { CanalContato } from '../../interfaces/canal-contato';
import { CampoFormulario } from '../../interfaces/campo-formulario';
import { FaqItem } from '../../interfaces/faq-item';
import { HeroContent } from '../../interfaces/hero-content';
import { NavItem } from '../../interfaces/nav-item';

@Component({
  selector: 'app-contato',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HeaderComponent, FooterComponent],
  templateUrl: './contato.html',
  styleUrl: './contato.css'
})
export class Contato {
  private readonly fb = inject(FormBuilder);

  readonly statusEnvio = signal<'normal' | 'sucesso' | 'erro'>('normal');

  readonly navItems: NavItem[] = [
    { label: 'Home', route: '/home' },
    { label: 'Produtos', route: '/produtos' },
    { label: 'Contato', route: '/contato' }
  ];

  readonly footerLinks: NavItem[] = this.navItems;

  readonly hero: HeroContent = {
    tag: 'Contato',
    title: 'Fale com a Umami Foods',
    description:
      'Use esta página para simular o contato com a distribuidora, tirar dúvidas sobre produtos ou solicitar um orçamento.'
  };

  readonly canais: CanalContato[] = [
    {
      titulo: 'WhatsApp comercial',
      destaque: '(21) 99999-9999',
      descricao: 'Canal pensado para pedidos, dúvidas rápidas e cotações.'
    },
    {
      titulo: 'E-mail',
      destaque: 'contato@umamifoods.com.br',
      descricao: 'Opção para enviar solicitações com mais detalhes.'
    },
    {
      titulo: 'Horário de atendimento',
      destaque: 'Segunda a sexta, das 08h às 18h',
      descricao: 'Atendimento em horário comercial para clientes e parceiros.'
    }
  ];

  readonly assuntos: string[] = [
    'Dúvida sobre entrega',
    'Problema com pedido',
    'Acompanhar pedido',
    'Solicitação de orçamento',
    'Informações sobre produtos',
    'Troca ou devolução',
    'Problema no pagamento',
    'Cadastro de cliente',
    'Parceria comercial',
    'Reclamação',
    'Sugestão',
    'Outros'
  ];

  readonly faq: FaqItem[] = [
    {
      pergunta: 'Qual é o prazo de entrega?',
      resposta:
        'O prazo depende da região e do volume do pedido. No projeto, essa informação seria confirmada pelo atendimento.'
    },
    {
      pergunta: 'A Umami Foods atende restaurantes?',
      resposta:
        'Sim. A proposta do site é atender restaurantes, mercados, deliveries e pequenos negócios.'
    },
    {
      pergunta: 'Posso pedir orçamento antes de comprar?',
      resposta:
        'Sim. O cliente pode simular uma solicitação pelo formulário ou pelos canais de contato.'
    },
    {
      pergunta: 'Como acompanho meu pedido?',
      resposta:
        'O acompanhamento seria feito informando nome, telefone ou número do pedido.'
    },
    {
      pergunta: 'O site já envia a mensagem de verdade?',
      resposta:
        'Não. Nesta versão acadêmica, o formulário apenas valida os dados e simula o envio.'
    }
  ];

  readonly camposFormulario: CampoFormulario[] = [
    {
      label: 'Nome',
      controlName: 'nome',
      type: 'text',
      placeholder: 'Digite seu nome'
    },
    {
      label: 'E-mail',
      controlName: 'email',
      type: 'email',
      placeholder: 'seu@email.com'
    },
    {
      label: 'Telefone',
      controlName: 'telefone',
      type: 'tel',
      placeholder: '(21) 99999-9999'
    },
    {
      label: 'Assunto',
      controlName: 'assunto',
      type: 'select'
    },
    {
      label: 'Mensagem',
      controlName: 'mensagem',
      type: 'textarea',
      placeholder: 'Digite sua mensagem',
      rows: 5
    }
  ];

  readonly form = this.fb.group({
    nome: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    telefone: [''],
    assunto: ['', Validators.required],
    mensagem: ['', [Validators.required, Validators.minLength(10)]]
  });

  enviarFormulario(): void {
    if (this.form.invalid) {
      this.statusEnvio.set('erro');
      this.form.markAllAsTouched();
      return;
    }

    console.log('Dados do formulário:', this.form.value);

    this.statusEnvio.set('sucesso');

    setTimeout(() => {
      this.form.reset();
      this.statusEnvio.set('normal');
    }, 2000);
  }
}