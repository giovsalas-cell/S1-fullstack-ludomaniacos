import { TestBed } from '@angular/core/testing';
import { CarritoService } from './carrito.service';

describe('CarritoService', () => {
  let servicio: CarritoService;
  beforeEach(() => {
    localStorage.clear();
    TestBed.configureTestingModule({});
    servicio = TestBed.inject(CarritoService);
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('debe agregar un producto nuevo al carrito con cantidad 1', () => {
    servicio.agregar({
      nombre: 'Catan',
      precio: 20000,
      img: 'catan.png',
      descripcion: 'Juego de mesa',
      descuento: '',
      precioOriginal: 20000,
    });

    const productos = servicio.obtener();
    expect(productos.length).toBe(1);
    expect(productos[0].nombre).toBe('Catan');
    expect(productos[0].cantidad).toBe(1);
  });

  it('debe incrementar la cantidad si el producto ya existe en el carrito', () => {
    const producto = {
      nombre: 'Catan',
      precio: 20000,
      img: 'catan.png',
      descripcion: 'Juego de mesa',
      descuento: '',
      precioOriginal: 20000,
    };

    servicio.agregar(producto);
    servicio.agregar(producto);

    const productos = servicio.obtener();
    expect(productos.length).toBe(1);
    expect(productos[0].cantidad).toBe(2);
  });

  it('debe eliminar un producto del carrito por su nombre', () => {
    servicio.agregar({
      nombre: 'Catan',
      precio: 20000,
      img: 'catan.png',
      descripcion: 'Juego de mesa',
      descuento: '',
      precioOriginal: 20000,
    });

    servicio.eliminar('Catan');

    expect(servicio.obtener().length).toBe(0);
  });

  it('debe calcular correctamente el total del carrito', () => {
    servicio.agregar({
      nombre: 'Catan',
      precio: 20000,
      img: 'catan.png',
      descripcion: 'Juego de mesa',
      descuento: '',
      precioOriginal: 20000,
    });
    servicio.agregar({
      nombre: 'Catan',
      precio: 20000,
      img: 'catan.png',
      descripcion: 'Juego de mesa',
      descuento: '',
      precioOriginal: 20000,
    });
    servicio.agregar({
      nombre: 'Dixit',
      precio: 15000,
      img: 'dixit.png',
      descripcion: 'Juego de cartas',
      descuento: '',
      precioOriginal: 15000,
    });

    // 20000*2 + 15000*1 = 55000
    expect(servicio.total()).toBe(55000);
  });
});
