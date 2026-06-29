import { TestBed } from '@angular/core/testing';
import { Autenticar } from './autenticar';

describe('Autenticar', () => {
  let servicio: Autenticar;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    servicio = TestBed.inject(Autenticar);
  });

  // Prueba 1: login correcto
  it('debe retornar true cuando el usuario y contraseña son correctos', () => {
    const resultado = servicio.login('admin', 'Admin');
    expect(resultado).toBeTruthy();
  });

  // Prueba 2: login incorrecto
  it('debe retornar false cuando la contraseña es incorrecta', () => {
    const resultado = servicio.login('admin', 'incorrecta');
    expect(resultado).toBeFalsy();
  });

  // Prueba 3: registro con correo nuevo
  it('debe retornar true al registrar un usuario con correo nuevo', () => {
    const resultado = servicio.registrar({
      nombre: 'Test',
      nombreUsuario: 'testuser',
      correo: 'test@nuevo.cl',
      password: 'Test1',
      fechaNacimiento: '2000-01-01',
      direccion: '',
    });
    expect(resultado).toBeTruthy();
  });

  // Prueba 4: registro con correo ya existente
  it('debe retornar false al registrar un usuario con correo ya existente', () => {
    const resultado = servicio.registrar({
      nombre: 'Otro',
      nombreUsuario: 'otro',
      correo: 'admin@ludomaniacos.cl',
      password: 'Admin1',
      fechaNacimiento: '2000-01-01',
      direccion: '',
    });
    expect(resultado).toBeFalsy();
  });
});
