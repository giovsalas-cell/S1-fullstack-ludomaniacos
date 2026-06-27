import { Injectable, signal } from '@angular/core';
export type Rol = 'admin' | 'usuario';

export interface Usuario {
  nombre: string;
  nombreUsuario: string;
  correo: string;
  password: string;
  fechaNacimiento: string;
  direccion: string;
  rol: Rol;
}

@Injectable({
  providedIn: 'root',
})
export class Autenticar {
  private usuarios: Usuario[] = [
    {
      nombre: 'Administrador',
      nombreUsuario: 'admin',
      correo: 'admin@ludomaniacos.cl',
      password: 'Admin',
      fechaNacimiento: '1990-01-01',
      direccion: 'Enrique segoviano',
      rol: 'admin',
    },
    {
      nombre: 'Juan Pérez',
      nombreUsuario: 'juanito',
      correo: 'juan@gmail.com',
      password: 'Juan1',
      fechaNacimiento: '2000-05-10',
      direccion: 'Av. Siempreviva 123',
      rol: 'usuario',
    },
  ];

  usuarioActual = signal<Usuario | null>(null);

  login(nombreUsuario: string, password: string): boolean {
    const encontrado = this.usuarios.find(
      (u) => u.nombreUsuario === nombreUsuario && u.password === password,
    );
    if (encontrado) {
      this.usuarioActual.set(encontrado);
      return true;
    }
    return false;
  }
  recuperarPassword(correo: string, nuevaPassword: string): boolean {
    const usuario = this.usuarios.find((u) => u.correo === correo);
    if (!usuario) return false;
    usuario.password = nuevaPassword;
    return true;
  }
  registrar(datos: any): boolean {
    // verifica si el correo ya existe
    const existe = this.usuarios.find((u) => u.correo === datos.correo);

    if (existe) {
      return false;
    }

    this.usuarios.push({
      nombre: datos.nombre,
      nombreUsuario: datos.nombreUsuario,
      correo: datos.correo, // ← correo no email
      password: datos.password,
      fechaNacimiento: datos.fechaNacimiento,
      direccion: datos.direccion,
      rol: 'usuario',
    });

    return true;
  }

  logout() {
    this.usuarioActual.set(null);
  }

  getRol() {
    const usuario = this.usuarioActual();
    if (usuario) {
      return usuario.rol;
    }
    return null;
  }
  estaLogueado(): boolean {
    const usuario = this.usuarioActual();
    if (usuario !== null) {
      return true;
    }
    return false;
  }
  esAdmin(): boolean {
    const usuario = this.usuarioActual();
    if (usuario?.rol === 'admin') {
      return true;
    }
    return false;
  }
}
