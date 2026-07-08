import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './cadastro.html',
  styleUrl: './cadastro.css'
})
export class Cadastro {
  private router = inject(Router);
  private authService = inject(AuthService);
  private fb = inject(FormBuilder);

  statusCadastro = 'normal'; // 'normal', 'sucesso', 'erro'
  senhasDiferentes = false;

  campos = [
    { label: 'Nome', type: 'text', controlName: 'cliente_nome', placeholder: 'Nome completo' },
    { label: 'E-mail', type: 'email', controlName: 'cliente_email', placeholder: 'seu@email.com' },
    { label: 'CPF', type: 'text', controlName: 'cliente_cpf', placeholder: 'Apenas os 11 números' },
    { label: 'Telefone', type: 'text', controlName: 'cliente_telefone', placeholder: '21999999999' },
    { label: 'Senha', type: 'password', controlName: 'cliente_senha', placeholder: 'Mínimo 8 caracteres' },
    { label: 'Confirmar senha', type: 'password', controlName: 'confirmarSenha', placeholder: 'Repita a senha' }
  ];

  form = this.fb.group({ // valida o formulário 
    cliente_nome: ['', Validators.required],
    cliente_email: ['', [Validators.required, Validators.email]],
    cliente_cpf: ['', [Validators.required, Validators.minLength(11)]],
    cliente_telefone: [''],
    cliente_senha: ['', [Validators.required, Validators.minLength(8)]],
    confirmarSenha: ['', Validators.required]
  });

  irParaLogin(): void {
    this.router.navigate(['/login']); // após o cadastro, redireciona para a tela de login
  }

  verificarSenhas(): void { // verifica se as senhas digitadas são iguais e atualiza a variável senhasDiferentes
    const senha = this.form.value.cliente_senha || '';
    const confirmarSenha = this.form.value.confirmarSenha || '';
    this.senhasDiferentes = senha !== '' && confirmarSenha !== '' && senha !== confirmarSenha;
  }

  onSubmit(): void {
    this.verificarSenhas();

    if (this.form.invalid || this.senhasDiferentes) {
      this.statusCadastro = 'erro';
      return;
    }

    const dadosCliente = { // prepara os dados do cliente para envio ao serviço de autenticação
      // a API de cadastro espera os campos sem prefixo (confirmado pela resposta de erro do backend)
      nome: this.form.value.cliente_nome || '',
      email: this.form.value.cliente_email || '',
      senha: this.form.value.cliente_senha || '',
      telefone: this.form.value.cliente_telefone || '',
      cpf: this.form.value.cliente_cpf || ''
    };

    this.authService.cadastrar(dadosCliente).subscribe({
      next: () => {
        this.statusCadastro = 'sucesso';
        this.form.reset();
        
        // Aguarda 2.5 segundos para o usuário ler a mensagem de sucesso na tela antes de redirecionar
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 2500);
      },
      error: (erro) => {
        console.error('Erro no servidor:', erro);
        
        if (erro.status === 200 || erro.status === 201) { // Caso o servidor retorne um status de sucesso, mesmo que seja tratado como erro, consideramos o cadastro bem-sucedido
          this.statusCadastro = 'sucesso';
          this.form.reset();
          setTimeout(() => {
            this.router.navigate(['/login']);
          }, 2500);
        } else {
          this.statusCadastro = 'erro';
        }
      }
    });
  }
}
