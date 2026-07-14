import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

/**
 * Interfaz que define la estructura de una preventa
 */
export interface Preventa {
  id?: number;
  nombre: string;
  precio: number;
  precioOriginal: number;
  img: string;
  descuento: string;
  descripcion: string;
  fechaLanzamiento: string;
  unidades: number;
  disponible: boolean;
}

/**
 * Servicio para gestionar las preventas desde JSON Server
 * Implementa operaciones GET, POST, PUT y DELETE
 */
@Injectable({
  providedIn: 'root',
})
export class PreventasService {
  /** URL base de la API de preventas en JSON Server */
  private apiUrl = 'http://localhost:3000/preventas';

  constructor(private http: HttpClient) {}

  /**
   * GET - Obtiene todas las preventas
   * @returns Observable con lista de preventas
   */
  getPreventas(): Observable<Preventa[]> {
    return this.http.get<Preventa[]>(this.apiUrl);
  }

  /**
   * POST - Agrega una nueva preventa
   * @param preventa Objeto con los datos de la preventa
   * @returns Observable con la preventa creada
   */
  agregarPreventa(preventa: Preventa): Observable<Preventa> {
    return this.http.post<Preventa>(this.apiUrl, preventa);
  }

  /**
   * PUT - Edita una preventa existente
   * @param id ID de la preventa a editar
   * @param preventa Objeto con los nuevos datos
   * @returns Observable con la preventa actualizada
   */
  editarPreventa(id: number, preventa: Preventa): Observable<Preventa> {
    return this.http.put<Preventa>(`${this.apiUrl}/${id}`, preventa);
  }

  /**
   * DELETE - Elimina una preventa por su ID
   * @param id ID de la preventa a eliminar
   * @returns Observable vacío
   */
  eliminarPreventa(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
