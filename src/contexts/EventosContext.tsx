import { createContext, useContext, useState } from "react";
import api from "../api/api";
import { useAuth0 } from "@auth0/auth0-react";
import type { paths } from '../types/api';
import { PERMISSIONS } from "@/constants/roles";
import { useAuthPermissions } from "@/hooks/useAuthPermissions";
import { eventosMock } from "@/mocks/eventosMock";
type GetEventos =
  paths['/evento']['get']['responses']['200']['content']['application/json'];
type TipoEvento = GetEventos[number];

interface EventosContextType {
    searchEventosByName(name: string): GetEventos;
    setEventos: (eventos: GetEventos) => void;
  getEventoById(id: number | string): TipoEvento;
  listaEventos: GetEventos;
  loading: boolean;
  error: string | null;
  crearEvento: (data: TipoEvento) => Promise<any>;
  inicializarEventos: () => Promise<void>;
  returnEventos: () => GetEventos;
  returnEvento: (n: number) => TipoEvento;
  returnEventoByUserId: (id: string) => TipoEvento[];
  deleteEvento: (id: number) => void;
  updateEvento: (evento: TipoEvento) => void;
  cantidad: () => number;
  cantidadEntradas: (evento: number) => number;
  deleteTipoEntrada: (eventoIndex: number, tipoIndex: number) => void;
}

const EventosContext = createContext<EventosContextType | null>(null);

export function EventosProvider({ children }: { children: React.ReactNode }) {

  const { user } = useAuth0();
  const { hasPermission } = useAuthPermissions();
  const [listaEventos, setListaEventos] = useState([] as GetEventos);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function crearEvento(data: TipoEvento) {
    try {
      setLoading(true);

      const enviarDato = {
        nombre: data.nombre,
        fecha: new Date(data.fecha).toISOString(),
        descripcion: data.descripcion,
        tipoEntrada: {
          nombre: data.tipoEntrada[0].nombre,
          precio: Number(data.tipoEntrada[0].precio),
          cantidadEntradas: Number(data.tipoEntrada[0].cantidadEntradas)
        },
        creadorId: user?.sub,
        imagePublicId: data.imagePublicId || "owamwyzepzbcypvoxiwp"
      };

      let res = null;

      if (import.meta.env.MODE != "test") { res = await api.post("/evento", enviarDato);}
      else {
        console.log("Modo test: simulando creación de evento");
         res = { data: { id: "test-event-id", ...enviarDato } };
      }

      setListaEventos([...listaEventos, res.data]);
      return res.data;
    } catch (e: any) {
      setError(e.message);
      throw e;
    } finally {
      setLoading(false);
    }
  }
  function setEventos(eventos: GetEventos) {
    setListaEventos(eventos);
  }

  async function inicializarEventos() {
    try {
      // Si es entorno de testing, usar datos mock
      if (import.meta.env.MODE === 'test') {
        console.log("Modo de testing - Usando datos mock");
        setListaEventos(eventosMock);
        return;
      }

      const response = await fetch(`${import.meta.env.VITE_API_URL}/evento`);
      const eventos: GetEventos = await response.json();
      setListaEventos(eventos);
    } catch (error) {
      console.error("Error:", error);
    }
  }

  function searchEventosByName(name: string): GetEventos {
    return listaEventos.filter(evento =>
      evento.nombre.toLowerCase().includes(name.toLowerCase())
    );
  }

  function returnEventos() {
    if (hasPermission(PERMISSIONS.EVENT_CREATE)){
        return listaEventos.filter((evento) => evento.creadorId === user?.sub).slice();
    } else {
        return listaEventos.slice();
    }
  }

  function returnEvento(n: number) {
    return listaEventos[n];
  }

  function returnEventoByUserId(userId: string) {
    if (import.meta.env.MODE === 'test') {
      console.log("Modo de testing - Usando datos mock");
      console.log('mock de eventos', eventosMock);
      const lista = eventosMock.filter((evento) => evento.creadorId === userId).slice();
      console.log("Eventos filtrados por usuario (mock):", JSON.stringify(lista));
      
      return lista;
    }
   const lista = listaEventos.filter((evento) => evento.creadorId === userId).slice();
    return lista;
  }

  async function borrar(eventoId: number) {
    const res = await api.delete(`/evento/${eventoId}`);
    return res.data;
  }

  function deleteEvento(eventoId: number) {
    const evento = getEventoByIndex(eventoId);
    if (evento){
      if (import.meta.env.MODE !== 'test') {borrar(eventoId);}
      setListaEventos(listaEventos.filter(e => e.id !== evento.id));
    } else {
      throw new Error("Evento no encontrado para eliminar");
    }
    
  }

  async function enviarEventoActualizado(data: TipoEvento) {
    const res = await api.put("/evento", data);
    return res.data;
  }

  function updateEvento(updatedEvento: TipoEvento, eventoIndex: number) {
    try {
      const actualizar = [...listaEventos];
      const evento = getEventoByIndex(eventoIndex);
      if (!evento) {
        throw new Error("Evento no encontrado");
        return;
      }
      
      Object.entries(updatedEvento).forEach(([key, value]) => {
        console.log(`Procesando propiedad ${key} con valor:`, value);
        if (value !== undefined && value !== null && value !== "") {
          console.log(`Asignando nuevo valor a ${key}:`, value);
          evento[key] = value;
        }
      });
      if (import.meta.env.MODE !== 'test') enviarEventoActualizado(updatedEvento);
      setListaEventos(actualizar);
    } catch (error) {
      console.error("Error al actualizar:", error);
    }
  }

  function cantidad() {
    return listaEventos.length;
  }

  function cantidadEntradas(eventoIndex: number) {
    return listaEventos[eventoIndex].tipoEntrada.length;
  }

  function deleteTipoEntrada(eventoIndex: number, tipoIndex: number) {
    const actualizar = [...listaEventos];
    const evento = actualizar[eventoIndex];
    if (!evento) return;

    evento.tipoEntrada.splice(tipoIndex, 1);
    setListaEventos(actualizar);
  }

  function getEventoById(id: number | string) {
    return listaEventos.find(e => e._id == id);
  }

  function getIndexById(id: string){
    return listaEventos.findIndex(e => e._id == id);
  }

  function getEventoByIndex(index: number): TipoEvento {
    return listaEventos[index];
  }


  return (
    <EventosContext.Provider
      value={{
        getEventoByIndex,
        getIndexById,
        searchEventosByName,
        setEventos,
        getEventoById,
        listaEventos,
        loading,
        error,
        crearEvento,
        inicializarEventos,
        returnEventos,
        returnEvento,
        returnEventoByUserId,
        deleteEvento,
        updateEvento,
        cantidad,
        cantidadEntradas,
        deleteTipoEntrada,
      }}
    >
      {children}
    </EventosContext.Provider>
  );
}

export function useEventos() {
  const ctx = useContext(EventosContext);
  if (!ctx)
    throw new Error("useEventos debe usarse dentro de <EventosProvider>");
  return ctx;
}
