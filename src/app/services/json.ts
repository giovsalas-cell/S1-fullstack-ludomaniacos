import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Producto } from './modelo';

@Injectable({
  providedIn: 'root',
})
export class JsonService {
  private baseUrl = 'https://giovsalas-cell.github.io/json-repository';

  constructor(private http: HttpClient) {}

  getCarta(): Observable<Producto[]> {
    return this.http.get<Producto[]>(`${this.baseUrl}/carta.json`);
  }

  getMesa(): Observable<Producto[]> {
    return this.http.get<Producto[]>(`${this.baseUrl}/mesa.json`);
  }

  getRol(): Observable<Producto[]> {
    return this.http.get<Producto[]>(`${this.baseUrl}/rol.json`);
  }

  getCooperativo(): Observable<Producto[]> {
    return this.http.get<Producto[]>(`${this.baseUrl}/cooperativo.json`);
  }
}
