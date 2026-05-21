import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { Router } from '@angular/router';

import { CampoFormulario } from '../../interfaces/campo-formulario';
import { Usuario } from '../../models/usuario';
import { AuthService } from '../../services/auth.service';

type RegraSenha = {
  texto: string;
  ativa: () => boolean;
};

@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './cadastro.html',
  styleUrl: './cadastro.css'
})
export class Cadastro {
  private readonly router = inject(Router);
  private readonly authService = inject(AuthService);
  private readonly fb = inject(FormBuilder);

  readonly statusCadastro = signal<'normal' | 'sucesso' | 'erro'>('normal');

  senhasDiferentes = false;

  readonly campos: CampoFormulario[] = [
    { label: 'Nome', type: 'text', controlName: 'nome', placeholder: 'Digite seu nome' },
    { label: 'E-mail', type: 'email', controlName: 'email', placeholder: 'seu@email.com' },
    { label: 'Telefone', type: 'tel', controlName: 'telefone', placeholder: '(21) 99999-9999' },
    { label: 'Senha', type: 'password', controlName: 'senha', placeholder: 'Crie uma senha' },
    { label: 'Confirmar senha', type: 'password', controlName: 'confirmarSenha', placeholder: 'Digite a senha novamente' }
  ];

  readonly form = this.fb.group({
    nome: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    telefone: [''],
    senha: ['', Validators.required],
    confirmarSenha: ['', Validators.required]
  });

  regraMinimoCaracteres = false;
  regraMaximoCaracteres = false;
  regraLetraMaiuscula = false;
  regraCaracterEspecial = false;
  regraNumerosLetras = false;

  readonly regrasSenha: RegraSenha[] = [
    { texto: 'Mínimo de 8 caracteres', ativa: () => this.regraMinimoCaracteres },
    { texto: 'Máximo de 16 caracteres', ativa: () => this.regraMaximoCaracteres },
    { texto: 'Pelo menos 1 letra maiúscula', ativa: () => this.regraLetraMaiuscula },
    { texto: 'Pelo menos 1 caractere especial', ativa: () => this.regraCaracterEspecial },
    { texto: 'Combinação de letras e números', ativa: () => this.regraNumerosLetras }
  ];

  irParaLogin(): void {
    this.router.navigate(['/login']);
  }

  onInputCampo(controlName: string): void {
    if (controlName === 'senha') {
      this.validarSenha(this.form.controls.senha.value ?? '');
    }

    if (controlName === 'senha' || controlName === 'confirmarSenha') {
      this.verificarSenhas();
    }
  }

  validarSenha(senha: string): void {
    this.regraMinimoCaracteres = senha.length >= 8;
    this.regraMaximoCaracteres = senha.length > 0 && senha.length <= 16;
    this.regraLetraMaiuscula = /[A-Z]/.test(senha);
    this.regraCaracterEspecial = /[!@#$%^&*(),.?":{}|<>]/.test(senha);
    this.regraNumerosLetras = /\d/.test(senha) && /[A-Za-z]/.test(senha);
  }

  verificarSenhas(): void {
    const senha = this.form.controls.senha.value ?? '';
    const confirmarSenha = this.form.controls.confirmarSenha.value ?? '';

    this.senhasDiferentes =
      senha !== '' && confirmarSenha !== '' && senha !== confirmarSenha;
  }

  onSubmit(): void {
    this.validarSenha(this.form.controls.senha.value ?? '');
    this.verificarSenhas();

    if (this.form.invalid || this.senhasDiferentes || !this.senhaValida()) {
      this.statusCadastro.set('erro');
      this.form.markAllAsTouched();
      return;
    }

    const usuario: Usuario = {
      nome: this.form.controls.nome.value ?? '',
      email: this.form.controls.email.value ?? '',
      telefone: this.form.controls.telefone.value ?? '',
      senha: this.form.controls.senha.value ?? ''
    };

    this.authService.cadastrar(usuario);
    this.statusCadastro.set('sucesso');

    setTimeout(() => {
      this.limparFormulario();
      this.router.navigate(['/login']);
    }, 1500);
  }

  private senhaValida(): boolean {
    return (
      this.regraMinimoCaracteres &&
      this.regraMaximoCaracteres &&
      this.regraLetraMaiuscula &&
      this.regraCaracterEspecial &&
      this.regraNumerosLetras
    );
  }

  private limparFormulario(): void {
    this.form.reset();
    this.senhasDiferentes = false;
    this.regraMinimoCaracteres = false;
    this.regraMaximoCaracteres = false;
    this.regraLetraMaiuscula = false;
    this.regraCaracterEspecial = false;
    this.regraNumerosLetras = false;
    this.statusCadastro.set('normal');
  }
}