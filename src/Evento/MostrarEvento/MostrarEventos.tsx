import '../../App.css';
import { useEffect, useState } from 'react';
import type { paths } from '../../types/api';
import { EventosList } from './ListaEventos';
import {BuscarEventos} from './BuscarEventos';
import {DialogoCrearEvento} from '../CrearEvento/DialogoCrearEvento'
import { Flex } from "@chakra-ui/react"
import { useAuthPermissions } from '@/hooks/useAuthPermissions';
import { PERMISSIONS } from '@/constants/roles';
import {useEventos} from '@/contexts/EventosContext.tsx';
import {useAuth0} from '@auth0/auth0-react';


type Props ={
  isAuthenticated: boolean;
}
export function  MostrarEventos({isAuthenticated}: Props) {
  const {  inicializarEventos} = useEventos();
  const {user} = useAuth0();
  const {hasPermission} = useAuthPermissions();
  type GetEventos =
  paths['/evento']['get']['responses']['200']['content']['application/json'];
  // Definimos el tipo GetEventos usando los tipos generados




  // Llamamos a la función cuando se monta el componente
  useEffect(() => {
    console.log("roles del usuario:", hasPermission(PERMISSIONS.EVENT_CREATE).valueOf());
    inicializarEventos();
  }, []);


  return (
    <>
      <Flex align={'center'} justifyContent={'center'}>
        <BuscarEventos/>
        {(isAuthenticated && hasPermission(PERMISSIONS.EVENT_CREATE)) && <DialogoCrearEvento/>}
      </Flex>
        <EventosList  isAuthenticated={isAuthenticated}/>
  
    </>
  );
}