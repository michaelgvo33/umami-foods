import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Usuario } from '../../models/usuario';
import { CampoFormulario } from '../../interfaces/campo-formulario';

type RegraSenha = {
  texto: string;
  ativa: () => boolean;
};

@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './cadastro.html',
  styleUrls: ['./cadastro.css']
})
export class Cadastro {
  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  statusCadastro = signal<'normal' | 'sucesso' | 'erro'>('normal');
  senhasDiferentes = false;

  campos: CampoFormulario[] = [
    { label: 'Nome', type: 'text', controlName: 'nome', placeholder: 'Digite seu nome' },
    { label: 'Email', type: 'email', controlName: 'email', placeholder: 'seu@email.com' },
    { label: 'Telefone', type: 'tel', controlName: 'telefone', placeholder: '(21) 99999-9999' },
    { label: 'Senha', type: 'password', controlName: 'senha', placeholder: 'Crie sua senha' },
    { label: 'Confirmar senha', type: 'password', controlName: 'confirmarSenha', placeholder: 'Confirme sua senha' }
  ];

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

  regrasSenha: RegraSenha[] = [
    { texto: 'Minimo de 8 caracteres', ativa: () => this.regraMinimocaracteres },
    { texto: 'Maximo de 16 caracteres', ativa: () => this.regraMaximoCaracteres },
    { texto: 'Pelo menos 1 letra maiuscula', ativa: () => this.regraLetraMaiuscula },
    { texto: 'Pelo menos 1 caractere especial', ativa: () => this.regraCaracterEspecial },
    { texto: 'Combinacao de letras e numeros', ativa: () => this.regraNumerosLetras }
  ];

  irParaLogin(): void {
    this.router.navigate(['/login']);
  }

  onInputCampo(controlName: string): void {
    if (controlName === 'senha') {
      this.validarSenha(this.form.get('senha')?.value ?? '');
    }

    if (controlName === 'senha' || controlName === 'confirmarSenha') {
      this.verificarSenhas();
    }
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
      const usuario: Usuario = {
        nome,
        email,
        telefone: telefone ?? '',
        senha
      };

      this.authService.cadastrar(usuario);
      this.statusCadastro.set('sucesso');

      setTimeout(() => {
        this.form.reset();
        this.senhasDiferentes = false;
        this.regraMinimocaracteres = false;
        this.regraMaximoCaracteres = false;
        this.regraLetraMaiuscula = false;
        this.regraCaracterEspecial = false;
        this.regraNumerosLetras = false;
        this.router.navigate(['/login']);
      }, 1500);
    } else {
      this.statusCadastro.set('erro');
    }
  }
}
