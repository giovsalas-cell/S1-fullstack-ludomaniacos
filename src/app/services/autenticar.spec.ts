import { Injectable, signal } from '@angular/core';

/**
 *  Tipo que define los roles disponibles en la aplicación
 */
export type Rol = 'admin' | 'usuario';

/**
 *  Interface que define la estructura de un usuario
 */
export interface Usuario {
  nombre: string;
  nombreUsuario: string;
  correo: string;
  password: string;
  fechaNacimiento: string;
  direccion: string;
  rol: Rol;
}

/**
 *  Servicio de autenticación que maneja login, registro y gestión de usuarios
 */
@Injectable({
  providedIn: 'root',
})
export class Autenticar {
  private usuarios: Usuario[] = [
    {
      nombre: 'Administrador',
      nombreUsuario: 'admin',
      correo: 'admin@ludomaniacos.cl',
      password: 'Admin1',
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

  /**  Signal que almacena el usuario actualmente logueado */
  usuarioActual = signal<Usuario | null>(null);

  /**
   *  Inicia sesión con nombre de usuario y contraseña
   * @param nombreUsuario - Nombre de usuario registrado
   * @param password - Contraseña del usuario
   * @returns true si las credenciales son correctas, false si no
   */
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

  /**
   *  Registra un nuevo usuario en el sistema
   * @param datos - Objeto con los datos del formulario de registro
   * @returns true si el registro fue exitoso, false si el correo ya existe
   */
  registrar(datos: any): boolean {
    const existe = this.usuarios.find((u) => u.correo === datos.correo);
    if (existe) return false;
    this.usuarios.push({
      nombre: datos.nombre,
      nombreUsuario: datos.nombreUsuario,
      correo: datos.correo,
      password: datos.password,
      fechaNacimiento: datos.fechaNacimiento,
      direccion: datos.direccion,
      rol: 'usuario',
    });
    return true;
  }

  /**
   *  Actualiza los datos del perfil del usuario logueado
   * @param datos - Objeto con los nuevos datos del perfil
   * @returns true si se actualizó correctamente, false si el correo ya está en uso
   */
  actualizarPerfil(datos: any): boolean {
    const usuario = this.usuarioActual();
    if (!usuario) return false;
    const correoEnUso = this.usuarios.find(
      (u) => u.correo === datos.correo && u.correo !== usuario.correo,
    );
    if (correoEnUso) return false;
    usuario.nombre = datos.nombre;
    usuario.nombreUsuario = datos.nombreUsuario;
    usuario.correo = datos.correo;
    usuario.direccion = datos.direccion;
    if (datos.password) {
      usuario.password = datos.password;
    }
    this.usuarioActual.set(usuario);
    return true;
  }

  /**
   *  Recupera la contraseña de un usuario por su correo
   * @param correo - Correo del usuario registrado
   * @param nuevaPassword - Nueva contraseña a establecer
   * @returns true si se actualizó correctamente, false si el correo no existe
   */
  recuperarPassword(correo: string, nuevaPassword: string): boolean {
    const usuario = this.usuarios.find((u) => u.correo === correo);
    if (!usuario) return false;
    usuario.password = nuevaPassword;
    return true;
  }

  /**
   *  Cierra la sesión del usuario actual
   */
  logout() {
    this.usuarioActual.set(null);
  }

  /**
   *  Obtiene el rol del usuario actual
   * @returns El rol del usuario o null si no hay sesión
   */
  getRol() {
    const usuario = this.usuarioActual();
    if (usuario) return usuario.rol;
    return null;
  }

  /**
   *  Verifica si hay un usuario logueado
   * @returns true si hay sesión activa
   */
  estaLogueado(): boolean {
    return this.usuarioActual() !== null;
  }

  /**
   *  Verifica si el usuario actual es administrador
   * @returns true si el usuario tiene rol admin
   */
  esAdmin(): boolean {
    return this.usuarioActual()?.rol === 'admin';
  }
}
