import { Routes } from '@angular/router';
import { Inicio } from './components/inicio/inicio';
import { Formulario } from './components/formulario/formulario';
import { Categoria } from './components/categoria/categoria';
import { Carrito } from './components/carrito/carrito';
import { Login } from './components/login/login';
import { Admin } from './components/admin/admin';
import { adminGuard } from './guards/auth-guard';
import { Recuperar } from './components/recuperar/recuperar';

export const routes: Routes = [
  { path: '', component: Inicio },
  { path: 'formulario', component: Formulario },
  { path: 'categoria/:tipo', component: Categoria },
  { path: 'carrito', component: Carrito },
  { path: 'login', component: Login },
  { path: 'admin', component: Admin, canActivate: [adminGuard] },
  { path: 'recuperar', component: Recuperar },
];
