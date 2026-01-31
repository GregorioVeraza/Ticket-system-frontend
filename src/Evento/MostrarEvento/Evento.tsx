import '../css/Evento.css'
import { EventoModal } from '../EventoModal';
import { useNavigate} from 'react-router-dom'
import React from 'react';
import {Card, Text, Image, IconButton} from '@chakra-ui/react'
import { useAuthPermissions  } from '@/hooks/useAuthPermissions';
import { PERMISSIONS } from '@/constants/roles';
import {useEventos} from '@/contexts/EventosContext.tsx';

type Prop={
    precio: string;
    hora: string;
    isAuthenticated: boolean;
    eventoId: string;
}
export function Evento(prop:Prop){
    const navigate = useNavigate();
    const {hasPermission, } = useAuthPermissions();
    const [modalOpen, setModalOpen] =  React.useState(false);
    const [isUpdate, setIsUpdate] = React.useState(false);
    const { getEventoById, getIndexById } = useEventos();
    const evento = getEventoById(prop.eventoId);
    const index = getIndexById(prop.eventoId);


    function abrirModal(isUpdate: boolean, event: React.MouseEvent<HTMLButtonElement, MouseEvent>){
        event.stopPropagation();
        setIsUpdate(isUpdate);
        setModalOpen(true);
    } 
    function irAlEvento(){
        navigate(`/evento/${evento.nombre}`, {
            state: {eventoId: prop.eventoId,
            hora: prop.hora  }
        });
    }
    return (
        <>
        <EventoModal  isUpdate={isUpdate} open={modalOpen} setModal={setModalOpen} eventoId={index}/>
        <Card.Root
            _hover={{ cursor: 'pointer', transform: 'scale(1.05)', transition: '0.3s' }}
        data-cy={`card-${evento.nombre}`} className='cards' maxW="sm" overflow="hidden" onClick={irAlEvento} border={'none'} backgroundColor={'white'} shadow={'sm'} maxWidth={'none'}>
            <Image
                src={`${import.meta.env.VITE_CLOUDINARY_URL}q_auto/${evento.imagePublicId}`}
                alt="Green double couch with wooden legs"
            />
            <Card.Body gap="2">
                <Card.Title>{evento.nombre}</Card.Title>
                <Text textStyle="2xl" data-cy="precio-evento" fontWeight="medium" letterSpacing="tight" mt="2" color={'GrayText'}>
                  {prop.precio}
                </Text>
            </Card.Body>
            {(prop.isAuthenticated) &&<Card.Footer gap="2">
              {(hasPermission(PERMISSIONS.EVENT_UPDATE)) &&<IconButton data-cy="editar-evento" size={'md'} backgroundColor={'Highlight'} onClick={(e) => {abrirModal(true, e)}}><Image  htmlHeight="10px" htmlWidth="10px" fit="contain" src="https://www.svgrepo.com/show/470171/update-alt-2.svg" alt="" /></IconButton>}
              {(hasPermission(PERMISSIONS.EVENT_DELETE)) &&<IconButton data-cy="eliminar-evento" size={'md'} backgroundColor={'Highlight'} onClick={(e) => {abrirModal(false, e)}}><Image htmlHeight="10px" htmlWidth="10px" fit="contain" src="https://www.svgrepo.com/show/511788/delete-1487.svg" alt="" /></IconButton>}
            </Card.Footer>}
        </Card.Root>
        </>
    );
}