import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  private router = inject(Router);
  private authService = inject(AuthService);
  private fb = inject(FormBuilder);

  statusLogin = 'normal'; // 'normal', 'sucesso', 'erro', 'erro-servidor'

  readonly campos = [
    { label: 'E-mail', type: 'email', controlName: 'email', placeholder: 'seu@email.com' },
    { label: 'Senha', type: 'password', controlName: 'senha', placeholder: 'Digite sua senha' }
  ];

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    senha: ['', Validators.required]
  });

  irParaCadastro(): void {
    this.router.navigate(['/cadastro']);
  }

  entrar(): void {
    if (this.loginForm.invalid) {
      this.statusLogin = 'erro';
      this.loginForm.markAllAsTouched();
      return;
    }

    const emailDigitado = this.loginForm.value.email || '';
    const senhaDigitada = this.loginForm.value.senha || '';

    this.authService.login(emailDigitado, senhaDigitada).subscribe({
      next: (sucesso) => {
        if (sucesso) {
          this.statusLogin = 'sucesso';
          this.router.navigate(['/home']);
        } else {
          this.statusLogin = 'erro';
        }
      },
     
    });
  }
}
