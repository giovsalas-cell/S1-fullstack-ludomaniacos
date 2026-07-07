import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JsonService } from '../../services/json';
import { Producto } from '../../services/modelo';
import { CarritoService } from '../../services/carrito.service';

@Component({
  selector: 'app-categoria',
  imports: [],
  templateUrl: './categoria.html',
  styleUrl: './categoria.css',
})
export class Categoria implements OnInit {
  tipo = signal('');
  productosCarta = signal<Producto[]>([]);
  productosMesa = signal<Producto[]>([]);
  productosRol = signal<Producto[]>([]);
  productosCooperativo = signal<Producto[]>([]);

  constructor(
    private route: ActivatedRoute,
    private jsonService: JsonService,
    private carritoService: CarritoService,
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.tipo.set(params['tipo']);
    });

    this.jsonService.getCarta().subscribe((data) => {
      this.productosCarta.set(data);
    });

    this.jsonService.getMesa().subscribe((data) => {
      this.productosMesa.set(data);
    });

    this.jsonService.getRol().subscribe((data) => {
      this.productosRol.set(data);
    });

    this.jsonService.getCooperativo().subscribe((data) => {
      this.productosCooperativo.set(data);
    });
  }

  agregarAlCarro(producto: any) {
    this.carritoService.agregar(producto);
    alert(producto.nombre + ' agregado al carrito ');
  }
}
