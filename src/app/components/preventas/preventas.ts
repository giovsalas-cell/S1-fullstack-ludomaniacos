import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JsonService } from '../../services/json';

/**
 * Componente de preventas que consume datos desde GitHub Pages
 * y guarda las reservas en localStorage
 */
@Component({
  selector: 'app-preventas',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './preventas.html',
  styleUrl: './preventas.css',
})
export class Preventas implements OnInit {
  /** Lista de preventas obtenidas desde GitHub Pages */
  preventas = signal<any[]>([]);

  /** Lista de reservas guardadas en localStorage */
  reservas = signal<any[]>([]);

  /** Clave para localStorage */
  private readonly KEY = 'reservas_ludomaniacos';

  constructor(private jsonService: JsonService) {}

  ngOnInit() {
    this.cargarPreventas();
    this.cargarReservas();
  }

  /**
   * Carga las preventas desde GitHub Pages usando el servicio JSON
   */
  cargarPreventas() {
    this.jsonService.getPreventas().subscribe({
      next: (data: any[]) => {
        this.preventas.set(data);
      },
      error: (err) => {
        console.error('Error al cargar preventas:', err);
      },
    });
  }

  /**
   * Carga las reservas guardadas en localStorage
   */
  cargarReservas() {
    const data = localStorage.getItem(this.KEY);
    this.reservas.set(data ? JSON.parse(data) : []);
  }

  /**
   * Reserva un juego en preventa guardándolo en localStorage
   * @param preventa Juego a reservar
   */
  reservar(preventa: any) {
    const reservas = this.reservas();
    const existe = reservas.find((r) => r.id === preventa.id);
    if (existe) {
      alert('Ya tienes una reserva para ' + preventa.nombre);
      return;
    }
    const nuevasReservas = [
      ...reservas,
      { ...preventa, fechaReserva: new Date().toLocaleDateString() },
    ];
    localStorage.setItem(this.KEY, JSON.stringify(nuevasReservas));
    this.reservas.set(nuevasReservas);
    alert(' Reserva realizada para ' + preventa.nombre);
  }

  /**
   * Cancela una reserva eliminándola de localStorage
   * @param id ID del juego a cancelar
   */
  cancelarReserva(id: number) {
    const nuevasReservas = this.reservas().filter((r) => r.id !== id);
    localStorage.setItem(this.KEY, JSON.stringify(nuevasReservas));
    this.reservas.set(nuevasReservas);
  }
}
