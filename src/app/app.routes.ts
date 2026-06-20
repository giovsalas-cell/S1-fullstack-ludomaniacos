import { Routes } from '@angular/router';
import { Inicio } from './components/inicio/inicio';
import { Formulario } from './components/formulario/formulario';
import { Categoria } from './components/categoria/categoria';
import { Carrito } from './components/carrito/carrito';

export const routes: Routes = [
  { path: '', component: Inicio },
  { path: 'formulario', component: Formulario },
  { path: 'categoria/:tipo', component: Categoria },
  { path: 'carrito', component: Carrito },
];
