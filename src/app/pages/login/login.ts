import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth.service';

type CampoLogin = {
  label: string;
  type: 'email' | 'password';
  controlName: 'email' | 'senha';
  placeholder: string;
};

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  private readonly router = inject(Router);
  private readonly authService = inject(AuthService);
  private readonly fb = inject(FormBuilder);

  readonly statusLogin = signal<'normal' | 'sucesso' | 'erro'>('normal');

  readonly campos: CampoLogin[] = [
    {
      label: 'E-mail',
      type: 'email',
      controlName: 'email',
      placeholder: 'seu@email.com'
    },
    {
      label: 'Senha',
      type: 'password',
      controlName: 'senha',
      placeholder: 'Digite sua senha'
    }
  ];

  readonly loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    senha: ['', Validators.required]
  });

  irParaCadastro(): void {
    this.router.navigate(['/cadastro']);
  }

  entrar(): void {
    if (this.loginForm.invalid) {
      this.statusLogin.set('erro');
      this.loginForm.markAllAsTouched();
      return;
    }

    const email = this.loginForm.controls.email.value ?? '';
    const senha = this.loginForm.controls.senha.value ?? '';

    const loginValido = this.authService.login(email, senha);

    if (!loginValido) {
      this.statusLogin.set('erro');
      return;
    }

    this.statusLogin.set('sucesso');

    setTimeout(() => {
      this.router.navigate(['/home']);
    }, 1200);
  }
}