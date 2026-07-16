import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Autenticar, Usuario } from '../../services/autenticar';
import { ProductosService, Producto } from '../../services/productos';

/**
 * Componente del panel de administración de Ludomaniacos
 * Permite gestionar productos con operaciones GET, POST, PUT y DELETE
 * Solo accesible para usuarios con rol administrador
 */
@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './admin.html',
  styleUrl: './admin.css',
})
export class Admin implements OnInit {
  /** Usuario administrador actualmente logueado */
  usuario: Usuario | null = null;

  /** Lista de todos los productos obtenidos desde JSON Server */
  productos = signal<Producto[]>([]);

  /** Formulario reactivo para agregar o editar productos */
  formulario: FormGroup;

  /** Producto que está siendo editado actualmente, null si no hay edición activa */
  productoEditando: Producto | null = null;

  /** Mensaje de éxito tras realizar una operación */
  mensajeExito: string = '';

  constructor(
    private autenticar: Autenticar,
    private productosService: ProductosService,
    private router: Router,
    private fb: FormBuilder,
  ) {
    this.formulario = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(2)]],
      precio: ['', [Validators.required, Validators.min(1)]],
      precioOriginal: [0, [Validators.min(0)]],
      img: ['', Validators.required],
      descuento: [''],
      descripcion: ['', [Validators.required, Validators.minLength(10)]],
      categoria: ['', Validators.required],
    });
  }

  /**
   * Inicializa el componente obteniendo el usuario actual
   * y cargando la lista de productos desde JSON Server
   */
  ngOnInit() {
    this.usuario = this.autenticar.usuarioActual();
    console.log('Usuario:', this.usuario);
    console.log('ProductosService:', this.productosService);
    console.log('Antes de cargarProductos'); // ← agregar
    this.cargarProductos();
    console.log('Después de cargarProductos'); // ← agregar
  }
  /**
   * GET - Obtiene todos los productos desde JSON Server
   * y los almacena en el array local
   */
  cargarProductos() {
    this.productosService.getProductos().subscribe({
      next: (data) => {
        this.productos.set(data); // ← .set() en vez de =
      },
      error: (err) => {
        console.log('Error:', err);
      },
    });
  }

  /**
   * POST - Agrega un nuevo producto a JSON Server
   * Valida el formulario antes de enviar
   */
  agregar() {
    if (this.formulario.invalid) {
      this.formulario.markAllAsTouched();
      return;
    }
    this.productosService.agregarProducto(this.formulario.value).subscribe(() => {
      this.mensajeExito = 'Producto agregado correctamente';
      this.formulario.reset();
      this.cargarProductos();
    });
  }

  /**
   * PUT - Carga los datos de un producto en el formulario para editarlo
   * @param producto Producto a editar
   */
  cargarEdicion(producto: Producto) {
    this.productoEditando = producto;
    this.formulario.patchValue(producto);
  }

  /**
   * PUT - Guarda los cambios del producto que se está editando
   * Requiere que haya un producto en edición con ID válido
   */
  guardarEdicion() {
    if (this.formulario.invalid) {
      this.formulario.markAllAsTouched();
      return;
    }
    if (!this.productoEditando?.id) return;
    this.productosService
      .editarProducto(this.productoEditando.id, this.formulario.value)
      .subscribe(() => {
        this.mensajeExito = 'Producto editado correctamente';
        this.productoEditando = null;
        this.formulario.reset();
        this.cargarProductos();
      });
  }

  /**
   * DELETE - Elimina un producto por su ID previa confirmación
   * @param id Identificador único del producto a eliminar
   */
  eliminar(id: number) {
    if (confirm('¿Estás seguro de eliminar este producto?')) {
      this.productosService.eliminarProducto(id).subscribe(() => {
        this.mensajeExito = 'Producto eliminado correctamente';
        this.cargarProductos();
      });
    }
  }

  /**
   * Cancela la edición actual y limpia el formulario
   */
  cancelarEdicion() {
    this.productoEditando = null;
    this.formulario.reset();
    this.mensajeExito = '';
  }

  /**
   * Cierra la sesión del usuario y redirige al login
   */
  cerrarSesion() {
    this.autenticar.logout();
    this.router.navigate(['/login']);
  }
}
