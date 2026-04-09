import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  telaAtual = signal<'login' | 'cadastro'>('login');

  statusLogin = signal<'normal' | 'sucesso' | 'erro'>('normal');
  statusCadastro = signal<'normal' | 'sucesso' | 'erro'>('normal');

  senhasDiferentes = false;

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    senha: new FormControl('', Validators.required),
  });

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
    this.telaAtual.set('login');
    this.statusCadastro.set('normal');
    this.senhasDiferentes = false;
  }

  irParaCadastro(): void {
    this.telaAtual.set('cadastro');
    this.statusLogin.set('normal');
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
      const usuario = {
        nome,
        email,
        telefone,
        senha
      };

      localStorage.setItem('usuarioCadastrado', JSON.stringify(usuario));

      this.statusCadastro.set('sucesso');
      console.log('Cadastro realizado:', usuario);

      setTimeout(() => {
        this.telaAtual.set('login');
        this.statusCadastro.set('normal');
        this.form.reset();
        this.senhasDiferentes = false;

        this.regraMinimocaracteres = false;
        this.regraMaximoCaracteres = false;
        this.regraLetraMaiuscula = false;
        this.regraCaracterEspecial = false;
        this.regraNumerosLetras = false;
      }, 2000);
    } else {
      this.statusCadastro.set('erro');
      console.log('Formulário inválido');
    }
  }

  entrar(): void {
    const emailDigitado = this.loginForm.get('email')?.value ?? '';
    const senhaDigitada = this.loginForm.get('senha')?.value ?? '';

    const usuarioSalvo = localStorage.getItem('usuarioCadastrado');

    if (!usuarioSalvo) {
      this.statusLogin.set('erro');
      console.log('Nenhum usuário cadastrado');
      return;
    }

    const usuario = JSON.parse(usuarioSalvo);

    if (emailDigitado === usuario.email && senhaDigitada === usuario.senha) {
      this.statusLogin.set('sucesso');
      console.log('Login realizado com sucesso');
    } else {
      this.statusLogin.set('erro');
      console.log('Login inválido');
    }
  }
}