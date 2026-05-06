import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

type CampoLogin = {
  label: string;
  type: 'email' | 'password';
  controlName: string;
  placeholder: string;
};

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class Login {
  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  statusLogin = signal<'normal' | 'sucesso' | 'erro'>('normal');

  campos: CampoLogin[] = [
    {
      label: 'Email',
      type: 'email',
      controlName: 'email',
      placeholder: 'seu@email.com'
    },
    {
      label: 'Senha',
      type: 'password',
      controlName: 'senha',
      placeholder: '••••••••'
    }
  ];

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

    const sucesso = this.authService.login(emailDigitado, senhaDigitada);

    if (sucesso) {
      this.statusLogin.set('sucesso');

      setTimeout(() => {
        this.router.navigate(['/home']);
      }, 1200);
    } else {
      this.statusLogin.set('erro');
    }
  }
}
