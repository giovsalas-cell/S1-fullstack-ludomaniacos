import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CarritoService } from '../../services/carrito.service';
@Component({
  selector: 'app-categoria',
  imports: [],
  templateUrl: './categoria.html',
  styleUrl: './categoria.css',
})
export class Categoria implements OnInit {
  tipo: string = '';

  productosCarta = [
    {
      nombre: 'Truco',
      precio: 2000,
      precioOriginal: 0,
      img: '/img/maso-cartas-truco.webp',
      descuento: '',
      descripcion:
        'El Truco es un apasionante juego de estrategia y engaño que se juega con baraja española de 40 cartas, sin ochos ni nueves.',
    },
    {
      nombre: 'UNO',
      precio: 5990,
      precioOriginal: 0,
      img: '/img/maso-cartas-uno.jpg',
      descuento: '',
      descripcion:
        'Las cartas Uno son un juego icónico y mundialmente reconocido, favorito indiscutible para las reuniones familiares.',
    },
    {
      nombre: 'VIRUS HALLOWEEN',
      precio: 7990,
      precioOriginal: 0,
      img: '/img/maso-cartas-virus-halloween.jpg',
      descuento: '',
      descripcion:
        'Juego competitivo para 2 a 6 jugadores, mayores de 8 años. Duración promedio de 20 min, combinando azar y estrategia ligera.',
    },
  ];

  productosMesa = [
    {
      nombre: 'Catan',
      precio: 33991,
      precioOriginal: 39990,
      img: '/img/catan.avif',
      descuento: '-15% DESCUENTO',
      descripcion:
        'El clásico juego de estrategia donde debes colonizar, comerciar y construir en la isla de Catan.',
    },
    {
      nombre: 'Monopoly',
      precio: 39990,
      precioOriginal: 0,
      img: '/img/monopoly.avif',
      descuento: '',
      descripcion:
        'Su objetivo es formar un monopolio comprando, alquilando y vendiendo bienes raíces para llevar a la bancarrota a tus oponentes.',
    },
    {
      nombre: 'Jumanji',
      precio: 39990,
      precioOriginal: 0,
      img: '/img/jumanjijuego-65f8649a9f635.avif',
      descuento: '',
      descripcion:
        'Emocionante reto cooperativo diseñado para 2 a 4 jugadores de 8 años en adelante.',
    },
  ];

  productosRol = [
    {
      nombre: 'Heroquest First Light',
      precio: 33991,
      precioOriginal: 0,
      img: '/img/Rol-DragonQuest.webp',
      descuento: '',
      descripcion:
        'Héroe, tu viaje comienza aquí. Sigue a 4 héroes a lo largo de misiones en mazmorras llenas de monstruos y tesoros.',
    },
    {
      nombre: 'Mundo de Reterra',
      precio: 39990,
      precioOriginal: 0,
      img: '/img/rol-reterra.webp',
      descuento: '',
      descripcion:
        'Juego de reconstrucción de comunidades en un futuro no tan lejano. Las decisiones de cada jugador moldean el destino del mundo.',
    },
    {
      nombre: 'Warhammer 40,000',
      precio: 39990,
      precioOriginal: 0,
      img: '/img/warhammercarousel.png',
      descuento: '',
      descripcion:
        'Juego de guerra ambientado en un futuro distópico, mezclando ciencia ficción con fantasía heroica.',
    },
  ];

  productosCooperativo = [
    {
      nombre: 'La Isla Prohibida',
      precio: 33991,
      precioOriginal: 0,
      img: '/img/cooperativo-isla-prohibida.jpg',
      descuento: '',
      descripcion:
        'Juego cooperativo para 2 a 4 jugadores. Deben recuperar tesoros y escapar antes de que la isla se hunda.',
    },
    {
      nombre: 'KITCHEN RUSH!',
      precio: 39990,
      precioOriginal: 0,
      img: '/img/cooperativo-kitchen-rush.jpg',
      descuento: '',
      descripcion: 'Acabas de heredar un restaurante y debes convertirlo en un negocio exitoso.',
    },
    {
      nombre: 'ZOMBICIDE',
      precio: 39990,
      precioOriginal: 0,
      img: '/img/cooperativo-zonbiecide.webp',
      descuento: '',
      descripcion:
        'Juego cooperativo con miniaturas para 1 a 6 jugadores. Elige a tu superviviente y completa los objetivos.',
    },
  ];

  constructor(
    private route: ActivatedRoute,
    private CarritoService: CarritoService,
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.tipo = params['tipo'];
    });
  }
  agregarAlCarro(producto: any) {
    this.CarritoService.agregar(producto);
    alert(producto.nombre + ' agregado al carrito ');
  }
}
