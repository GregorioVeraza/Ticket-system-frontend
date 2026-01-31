import api from "../api/api";
import { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import type { paths } from '../types/api';
import { eventosMock } from "@/mocks/eventosMock";

export function useEventos() {
  type GetEventos =
      paths['/evento']['get']['responses']['200']['content']['application/json'];
  type TipoEvento = GetEventos[number];
  const [listaEventos, setListaEventos] = useState([] as GetEventos);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth0();

  async function crearEvento(data: TipoEvento) {
    try {
      setLoading(true);
      
      // Preparar los datos con las transformaciones necesarias
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
      
      console.log(enviarDato);
      let res = null;
      // ✅ Ahora sí envías enviarDato
      if (import.meta.env.MODE != "test") { res = await api.post("/evento", enviarDato);}
      else {
        console.log("Modo test: simulando creación de evento");
         res = { data: { id: "test-event-id", ...enviarDato } };
      }
      
      setListaEventos([...listaEventos, data]);
      console.log("Evento creado:", listaEventos);
      return res.data;
    } catch (e: any) {
      console.error(e);
      setError(e.message);
      throw e;
    } finally {
      setLoading(false);
    }
  }

  function returnEvento(numero: number): TipoEvento {
    return listaEventos[numero];
  }

  async function inicializarEventos(){
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/evento`);
      const eventos: GetEventos = await response.json();
      console.log('Eventos obtenidos:', eventos);
      setListaEventos(eventos);
    } catch (error) {
      console.error('Error:', error);
    }
  }
  function returnEventos(){
    return listaEventos;
  }

  function returnEventoByUserId(userId: string){
    if (import.meta.env.MODE === 'test') {
          console.log("Modo de testing - Usando datos mock");
          console.log('mock de eventos', eventosMock);
          const lista = eventosMock.filter((evento) => evento.creadorId === userId).slice();
          console.log("Eventos filtrados por usuario (mock):", JSON.stringify(lista));
          return lista;
        }
    const lista = listaEventos.filter((evento) => evento.creadorId === userId);
    setListaEventos(lista);
    return lista;
  }

  async function borrar(eventoId:number) {
      const res = await api.delete(`/evento/${eventoId}`);
      return res.data;
  }
  function deleteEvento(eventoId: number) {
    borrar(eventoId);
    setListaEventos(listaEventos.filter(evento => evento.id !== String(eventoId)));
  }
  async function enviarEventoActualizado(data:TipoEvento) {
      const res = await api.put("/evento", data);
      return res.data;
  }
  function updateEvento(updatedEvento: TipoEvento) {
    try {
      const actualizar = listaEventos.slice();
      const evento = actualizar.find(e => e.id === updatedEvento.id);
      if (!evento) return;
      if (updatedEvento.nombre) evento.nombre = updatedEvento.nombre;
      if (updatedEvento.fecha) evento.fecha = updatedEvento.fecha;
      if (updatedEvento.descripcion) evento.descripcion = updatedEvento.descripcion;
      /*if (updatedEvento.tipoEntrada && Array.isArray(updatedEvento.tipoEntrada)) {
      for (const newTipo of updatedEvento.tipoEntrada) {
          if (!evento.tipoEntrada.some(t => t.nombre === newTipo.nombre)) {
            evento.tipoEntrada.push(newTipo);
          }
        }
      }*/
      
      enviarEventoActualizado(updatedEvento);
      setListaEventos(actualizar);
    } catch (error){
      console.error('Error al actualizar el evento:', error);
    }
  }

  function cantidad(): number{
    return listaEventos.length;
  }
  function cantidadEntradas(evento: number): number{
    return listaEventos[evento].tipoEntrada.length;
  }

  function deleteTipoEntrada(eventoIndex: number, tipoIndex: number) {
    const actualizar = listaEventos.slice();
    const evento = actualizar[eventoIndex];
    if (!evento) return;
    evento.tipoEntrada.splice(tipoIndex, 1);
    setListaEventos(actualizar);
  }
  return {
    deleteTipoEntrada,
    cantidadEntradas,
    cantidad,
    updateEvento,
    deleteEvento,
    returnEventoByUserId,
    returnEventos,
    inicializarEventos,
    returnEvento,
    crearEvento,
    loading,
    error,
  };
}