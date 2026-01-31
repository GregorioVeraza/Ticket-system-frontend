import type { paths } from '../types/api';

type GetEventos = paths['/evento']['get']['responses']['200']['content']['application/json'];

export const eventosMock: GetEventos = [
  {
    _id: '1',
    id: '1',
    nombre: 'Concierto de Rock',
    fecha: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    descripcion: 'Concierto de rock en vivo',
    creadorId: 'test-user-1',
    imagePublicId: 'owamwyzepzbcypvoxiwp',
    tipoEntrada: [
      {
        nombre: 'Entrada General',
        precio: 50,
        cantidadEntradas: 100,
      },
      {
        nombre: 'VIP',
        precio: 150,
        cantidadEntradas: 20,
      },
    ],
  },
  {
    _id: '2',
    id: '2',
    nombre: 'Festival de Cine',
    fecha: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
    descripcion: 'Festival internacional de cine',
    creadorId: 'test-user-2',
    imagePublicId: 'owamwyzepzbcypvoxiwp',
    tipoEntrada: [
      {
        nombre: 'Entrada General',
        precio: 30,
        cantidadEntradas: 200,
      },
    ],
  },
  {
    _id: '3',
    id: '3',
    nombre: 'Conferencia Tech',
    fecha: new Date(Date.now() + 21 * 24 * 60 * 60 * 1000).toISOString(),
    descripcion: 'Conferencia sobre nuevas tecnologías',
    creadorId: 'test-user-1',
    imagePublicId: 'owamwyzepzbcypvoxiwp',
    tipoEntrada: [
      {
        nombre: 'Entrada General',
        precio: 75,
        cantidadEntradas: 150,
      },
      {
        nombre: 'Premium',
        precio: 200,
        cantidadEntradas: 50,
      },
    ],
  },
];
