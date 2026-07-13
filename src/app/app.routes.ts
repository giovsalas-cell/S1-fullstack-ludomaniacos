import { Routes } from '@angular/router';
import { Inicio } from './components/inicio/inicio';
import { Formulario } from './components/formulario/formulario';
import { Categoria } from './components/categoria/categoria';
import { Carrito } from './components/carrito/carrito';
import { Login } from './components/login/login';
import { Admin } from './components/admin/admin';
import { adminGuard } from './guards/auth-guard';
import { Recuperar } from './components/recuperar/recuperar';
import { Perfil } from './components/perfil/perfil';
import { Preventas } from './components/preventas/preventas';
import { PreventasJsonServer } from './components/preventas-json-server/preventas-json-server';

export const routes: Routes = [
  { path: '', component: Inicio },
  { path: 'formulario', component: Formulario },
  { path: 'categoria/:tipo', component: Categoria },
  { path: 'carrito', component: Carrito },
  { path: 'login', component: Login },
  { path: 'admin', component: Admin, canActivate: [adminGuard] },
  { path: 'recuperar', component: Recuperar },
  { path: 'perfil', component: Perfil },
  {
    path: 'categoria/:tipo',
    component: Categoria,
    runGuardsAndResolvers: 'always',
  },
  { path: 'preventas', component: Preventas },
  { path: 'preventas-json-server', component: PreventasJsonServer, canActivate: [adminGuard] },
];
