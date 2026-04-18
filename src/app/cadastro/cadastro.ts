import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './cadastro.html',
  styleUrl: './cadastro.css',
})
export class Cadastro {
  constructor(private router: Router) {}

  statusCadastro = signal<'normal' | 'sucesso' | 'erro'>('normal');
  senhasDiferentes = false;

  form = new FormGroup({
    nome: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    telefone: new FormControl(''),
    senha: new FormControl('', Validators.required),
    confirmarSenha: new FormControl('', Validators.required),
  });

  regraMinimocaracteres = false;
  regraMaximoCaracteres = false;
  regraLetraMaiuscula = false;
  regraCaracterEspecial = false;
  regraNumerosLetras = false;

  irParaLogin(): void {
    this.router.navigate(['/login']);
  }

  validarSenha(senha: string): void {
    const rxMin8 = /^.{8,}$/;
    const rxMax16 = /^.{1,16}$/;
    const rxMaiuscula = /[A-Z]/;
    const rxEspecial = /[!@#$%^&*(),.?":{}|<>]/;
    const rxNumero = /\d/;
    const rxLetra = /[A-Za-z]/;

    this.regraMinimocaracteres = rxMin8.test(senha);
    this.regraMaximoCaracteres = rxMax16.test(senha);
    this.regraLetraMaiuscula = rxMaiuscula.test(senha);
    this.regraCaracterEspecial = rxEspecial.test(senha);
    this.regraNumerosLetras = rxNumero.test(senha) && rxLetra.test(senha);
  }

  verificarSenhas(): void {
    const senha = this.form.get('senha')?.value ?? '';
    const confirmarSenha = this.form.get('confirmarSenha')?.value ?? '';
    this.senhasDiferentes = senha !== '' && confirmarSenha !== '' && senha !== confirmarSenha;
  }

  onSubmit(): void {
    const nome = this.form.get('nome')?.value ?? '';
    const email = this.form.get('email')?.value ?? '';
    const telefone = this.form.get('telefone')?.value ?? '';
    const senha = this.form.get('senha')?.value ?? '';
    const confirmarSenha = this.form.get('confirmarSenha')?.value ?? '';

    const senhaValida =
      this.regraMinimocaracteres &&
      this.regraMaximoCaracteres &&
      this.regraLetraMaiuscula &&
      this.regraCaracterEspecial &&
      this.regraNumerosLetras;

    this.senhasDiferentes = senha !== confirmarSenha;

    if (this.form.valid && !this.senhasDiferentes && senhaValida) {
      const usuario = { nome, email, telefone, senha };
      localStorage.setItem('usuarioCadastrado', JSON.stringify(usuario));

      this.statusCadastro.set('sucesso');

      setTimeout(() => {
        this.form.reset();
        this.router.navigate(['/login']);
      }, 1500);
    } else {
      this.statusCadastro.set('erro');
    }
  }
}
