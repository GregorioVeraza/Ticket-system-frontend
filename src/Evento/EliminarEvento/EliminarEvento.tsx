import '../css/EliminarEvento.css'
import { Dialog } from '@chakra-ui/react';
import {useEventos} from '@/contexts/EventosContext.tsx';
type Prop = {
    setModal: (abrir: boolean) => void;
    eventoId: number;
};


export function ElmininarEvento({eventoId,setModal}: Prop) {
    const { deleteEvento, returnEvento } = useEventos();

    function onSubmit() {
            deleteEvento(eventoId);
            setModal(false)
        }

    return (
        <Dialog.Content>
            <Dialog.Header>
                    <Dialog.Title color={'white'}>
                      Eliminar Evento
                    </Dialog.Title>
            </Dialog.Header>
            <Dialog.Body>
            ¿Seguro que querés eliminar el evento <b>{returnEvento(eventoId).nombre}</b>?
                
            </Dialog.Body>
            <Dialog.Footer className='buttons-span'>
                    <button onClick={() => setModal(false)} className='botones-modal'>Cerrar</button>
                    <button data-cy="confirmar-eliminacion" onClick={() => onSubmit()} className='botones-modal'>Confirmar</button>
            </Dialog.Footer>
        </Dialog.Content>
    );
}