import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Produtos } from './pages/produtos/produtos';
import { Contato } from './pages/contato/contato';
import { Login } from './pages/login/login';
import { Cadastro } from './pages/cadastro/cadastro';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: Home },
  { path: 'produtos', component: Produtos },
  { path: 'contato', component: Contato },
  { path: 'login', component: Login },
  { path: 'cadastro', component: Cadastro }
];
