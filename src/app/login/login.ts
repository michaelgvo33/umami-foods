import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  constructor(private router: Router) {}

  statusLogin = signal<'normal' | 'sucesso' | 'erro'>('normal');

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    senha: new FormControl('', Validators.required),
  });

  irParaCadastro(): void {
    this.router.navigate(['/cadastro']);
  }

  entrar(): void {
    const emailDigitado = this.loginForm.get('email')?.value ?? '';
    const senhaDigitada = this.loginForm.get('senha')?.value ?? '';

    const usuarioSalvo = localStorage.getItem('usuarioCadastrado');

    if (!usuarioSalvo) {
      this.statusLogin.set('erro');
      return;
    }

    const usuario = JSON.parse(usuarioSalvo);

    if (emailDigitado === usuario.email && senhaDigitada === usuario.senha) {
      this.statusLogin.set('sucesso');
    } else {
      this.statusLogin.set('erro');
    }
  }
}
