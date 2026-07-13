import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CarritoService } from '../../services/carrito.service';
import { ProductosService, Producto } from '../../services/productos';

/**
 * Componente que muestra los productos de una categoría específica
 * Consume la API REST de JSON Server filtrando por categoría desde la URL
 */
@Component({
  selector: 'app-categoria',
  imports: [],
  templateUrl: './categoria.html',
  styleUrl: './categoria.css',
})
export class Categoria implements OnInit {
  /**
   * Signal que almacena el tipo de categoría actual
   * Valores posibles: carta, mesa, rol, cooperativo
   */
  tipo = signal('');

  /**
   * Signal que almacena la lista de productos de la categoría actual
   */
  productos = signal<Producto[]>([]);

  constructor(
    private route: ActivatedRoute,
    private carritoService: CarritoService,
    private productosService: ProductosService,
  ) {}

  /**
   * Inicializa el componente leyendo el parámetro de la URL
   * y cargando los productos de esa categoría desde JSON Server
   */
  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.tipo.set(params['tipo']);

      // carga productos filtrados por categoria desde JSON Server
      this.productosService.getProductosPorCategoria(params['tipo']).subscribe((data) => {
        this.productos.set(data);
      });
    });
  }

  /**
   * Agrega un producto al carrito de compras
   * @param producto Producto a agregar al carrito
   */
  agregarAlCarro(producto: Producto) {
    this.carritoService.agregar(producto);
    alert(producto.nombre + ' agregado al carrito ');
  }
}
