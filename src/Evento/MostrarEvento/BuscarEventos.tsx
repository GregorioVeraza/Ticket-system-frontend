import '../css/BuscarEventos.css'
import type { paths } from '../../types/api';
import { useForm } from 'react-hook-form';
import { useEventos } from '@/contexts/EventosContext.tsx';

type GetEventos =
  paths['/evento']['get']['responses']['200']['content']['application/json'];


export function BuscarEventos() {
  const { searchEventosByName, updateEvento, returnEventos } = useEventos();
  const { register } = useForm();

  
  function fetchEventos(nombre: string) {
    if (!nombre) {
      // Restaurar todos los eventos que vienen por props
      return;
    }
    searchEventosByName(nombre);
  }
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const search: string = e.target.value.toLowerCase();
    fetchEventos(search)
  };

  return (
    <>
      <input
        type="search"
        className="search"
        placeholder="Buscar evento..."
        autoComplete='on'
        list='eventos'
        {...register("search")}
        onChange={handleChange} // ✅ dispara al escribir
        
      />
      <datalist id='eventos'>
        {returnEventos().map((evento: GetEventos[number]) => (
          <option key={evento.id} value={evento.nombre}></option>
        ))}
      </datalist>
    </>
  );
}

