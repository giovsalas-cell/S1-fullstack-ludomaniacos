import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductosService } from '../../services/productos';

/**
 * Componente de preventas que consume datos desde JSON Server
 * Permite CRUD completo sobre las preventas via API REST
 */
@Component({
  selector: 'app-preventas-json-server',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './preventas-json-server.html',
  styleUrl: './preventas-json-server.css',
})
export class PreventasJsonServer implements OnInit {
  /** Lista de preventas obtenidas desde JSON Server */
  preventas = signal<any[]>([]);

  /** Formulario para agregar o editar preventas */
  formulario: FormGroup;

  /** Preventa en edición actual */
  preventaEditando: any = null;

  /** Mensaje de éxito */
  mensajeExito: string = '';

  private apiUrl = 'http://localhost:3000/preventas';

  constructor(
    private fb: FormBuilder,
    private productosService: ProductosService,
  ) {
    this.formulario = this.fb.group({
      nombre: ['', Validators.required],
      precio: ['', Validators.required],
      precioOriginal: ['', Validators.required],
      img: ['', Validators.required],
      descuento: [''],
      descripcion: ['', Validators.required],
      fechaLanzamiento: ['', Validators.required],
      unidades: ['', Validators.required],
      disponible: [false],
    });
  }

  ngOnInit() {
    this.cargarPreventas();
  }

  /**
   * GET - Carga todas las preventas desde JSON Server
   */
  cargarPreventas() {
    this.productosService['http'].get<any[]>(this.apiUrl).subscribe((data) => {
      this.preventas.set(data);
    });
  }

  /**
   * POST - Agrega una nueva preventa
   */
  agregar() {
    if (this.formulario.invalid) {
      this.formulario.markAllAsTouched();
      return;
    }
    this.productosService['http'].post<any>(this.apiUrl, this.formulario.value).subscribe(() => {
      this.mensajeExito = 'Preventa agregada correctamente';
      this.formulario.reset();
      this.cargarPreventas();
    });
  }

  /**
   * PUT - Carga datos de una preventa para editar
   * @param preventa Preventa a editar
   */
  cargarEdicion(preventa: any) {
    this.preventaEditando = preventa;
    this.formulario.patchValue(preventa);
  }

  /**
   * PUT - Guarda los cambios de la preventa editada
   */
  guardarEdicion() {
    if (this.formulario.invalid || !this.preventaEditando?.id) return;
    this.productosService['http']
      .put<any>(`${this.apiUrl}/${this.preventaEditando.id}`, this.formulario.value)
      .subscribe(() => {
        this.mensajeExito = 'Preventa editada correctamente';
        this.preventaEditando = null;
        this.formulario.reset();
        this.cargarPreventas();
      });
  }

  /**
   * DELETE - Elimina una preventa por su ID
   * @param id ID de la preventa a eliminar
   */
  eliminar(id: number) {
    if (confirm('¿Eliminar esta preventa?')) {
      this.productosService['http'].delete<void>(`${this.apiUrl}/${id}`).subscribe(() => {
        this.mensajeExito = 'Preventa eliminada correctamente';
        this.cargarPreventas();
      });
    }
  }

  cancelarEdicion() {
    this.preventaEditando = null;
    this.formulario.reset();
    this.mensajeExito = '';
  }
}
