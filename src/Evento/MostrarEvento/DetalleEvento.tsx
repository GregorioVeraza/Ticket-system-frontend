import '../css/DetalleEvento.css';
import { useLocation, useNavigate} from 'react-router-dom';
import { useAuthPermissions } from '@/hooks/useAuthPermissions';
import { useAuth0 } from '@auth0/auth0-react';
import { PERMISSIONS } from '@/constants/roles';
import { useState } from 'react';
import { Alert, CloseButton, Card, Image, Button, Text } from '@chakra-ui/react';
import {useEventos} from '@/contexts/EventosContext.tsx';
export function DetalleEvento(){
    const {state} = useLocation();
     const { eventoId, hora} = state || {};
    const { getEventoById } = useEventos();
    const evento = getEventoById(eventoId);
    const {isAuthenticated} = useAuth0();
    const navigate = useNavigate();
    const {hasPermission} = useAuthPermissions();
    const [error, setError] = useState(false);

    function irAVerEntradas(){
        if (isAuthenticated && hasPermission(PERMISSIONS.TICKET_BUY)){
            console.log("id del evento:", evento._id);
            navigate(`/evento/${evento.nombre}/${evento._id}/entradas`, {state: {nombre: evento.nombre, id: evento._id}});
        } else {
            setError(true);
        }
    }
    
    return (
            <Card.Root  maxW="100%" overflow="hidden" border={'none'} backgroundColor='Background' shadow={'none'} width={"90%"} alignSelf="anchor-center" marginTop={'8px'}>
                
                <Image src={`${import.meta.env.VITE_CLOUDINARY_URL}q_auto/${evento.imagePublicId}`} alt={evento.nombre}/>
                <Card.Body gap="2">
                    <Card.Title color={'HighlightText'}>{evento.nombre}</Card.Title>
                <Card.Description>
                {evento.descripcion}
                </Card.Description>
                <Text textStyle="2xl" fontWeight="medium" letterSpacing="tight" mt="2">
                    Fecha: {new Date(evento.fecha).toLocaleDateString()} - Hora: {hora.substring(0,5)}
                </Text>
                </Card.Body>
                <Card.Footer gap="2">
                    <Button variant="surface" data-cy="ver-entradas-button" onClick={irAVerEntradas}>Ver entradas</Button>
                </Card.Footer>
                    {error && <Alert.Root status="error" size={"md"} width={"60"} position={"fixed"} bottom={"4"} right={"4"}>
                        <Alert.Indicator />
                        <Alert.Content>
                            <Alert.Title>Error</Alert.Title>
                            <Alert.Description>
                            Para realizar esta acción necesitas inicar sesión.
                            </Alert.Description>
                        </Alert.Content>
                        <CloseButton pos="relative" top="-2" insetEnd="-2" onClick={() => setError(false)}/>
                    </Alert.Root>}
            </Card.Root>
    );
}