import '../css/ListaEventos.css'
import React from "react";
import {Evento} from './Evento'
import {useEventos} from '@/contexts/EventosContext.tsx';


// Props del componente
interface EventosListProps {
  isAuthenticated: boolean;
}

export const EventosList: React.FC<EventosListProps> = ({ isAuthenticated}) => {
  const { cantidad, returnEventos } = useEventos();
  function obtenerPrecio(array: {nombre: string;precio: number;cantidadEntradas: number; }[] | undefined): string{
    if (!Array.isArray(array) || array.length === 0) {
      return `$${array.precio}`;
    }
    let min = Number.MAX_VALUE;
    let max = -1;
    array.forEach((t) => {
      t.precio < min && (min = t.precio);
      t.precio > max && (max = t.precio);
    })
    return `$${min}-${max}`;
  }

  function obtenerHora(fecha: string | Date): string {
    const fechaEvento = new Date(fecha);
    return fechaEvento.toISOString().split('T')[1].split('.')[0];
  }
  return (
      <div >
      {cantidad() === 0 ? (
        <p>No hay eventos disponibles.</p>
      ) : (
        <main className='grid-container-eventos'>
          {Array.isArray(returnEventos()) && returnEventos().map((evento, index) => (
            <Evento 
            precio={obtenerPrecio(evento.tipoEntrada)} 
            hora={obtenerHora(evento.fecha)}
            key={evento._id}
            isAuthenticated={isAuthenticated}
            eventoId={evento._id}
            />
          ))}
        </main>
      )}

      </div>
  );
};
