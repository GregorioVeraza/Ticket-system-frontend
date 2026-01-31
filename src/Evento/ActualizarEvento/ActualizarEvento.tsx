
import {useForm, FormProvider} from 'react-hook-form'
import { InputTexto } from '@/components/ui/Inputs/InputTexto';
import { Dialog, Button, Heading, Flex, Alert } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import type { paths } from '../../types/api';
import {useEventos} from '@/contexts/EventosContext';

type EventoProps = {
    eventoId: number;
    setModal: (modal: boolean) => void;
}
type GetEventos =
      paths['/evento']['get']['responses']['200']['content']['application/json'];
  type TipoEvento = GetEventos[number];


export function ActualizarEvento({ eventoId, setModal }: EventoProps) {
    const methods = useForm<TipoEvento>({
        mode: "onChange"
    });
    const [alertVisible, setAlertVisible] = useState(false);
    const [alertErrorVisible, setAlertErrorVisible] = useState(false);
    const {updateEvento, cantidadEntradas, deleteTipoEntrada, getEventoById, getEventoByIndex} = useEventos();
    const [cantidad, setCantidad] = useState(cantidadEntradas(eventoId-1)-1);
    const evento = getEventoByIndex(eventoId);
/*
    async function enviarEventoActualizado(data:EventoTipo) {
    const res = await api.put("/evento", data);
    return res.data;
    }
*/
    useEffect(() => {
        console.log('eventoId:', eventoId);
        console.log('evento:', evento);
        console.log(methods.watch());
    }, [methods.watch()])

    function onSubmit(data: TipoEvento) {
        /*console.log("Datos recibidos " + JSON.stringify(data));
        const actualizado: TipoEvento = {
            _id: evento._id,
            descripcion: evento.descripcion,
            fecha: evento.fecha,
            nombre: evento.nombre,
            tipoEntrada: evento.tipoEntrada
        };
        console.log(actualizado.tipoEntrada);
        Object.keys(evento).forEach((propiedad) => {
            const propiedadTipada = propiedad as keyof EventoTipo;
            if (methods.watch(propiedadTipada) != "" &&
            methods.watch(propiedadTipada) != undefined &&
            evento[propiedadTipada] != methods.watch(propiedadTipada)){
                const valorNuevo: any = methods.watch(propiedadTipada as any);
                actualizado[propiedadTipada] = valorNuevo;
            }
        })

        console.log(enviarEventoActualizado(actualizado));
        */
       console.log("Datos a enviar:", data);
    
        setModal(true);
        updateEvento(data, eventoId);
    }

    return (
        <Dialog.Content>
            <Dialog.Header>
                    <Dialog.Title color={'white'}>
                      Actualizar Evento
                    </Dialog.Title>
            </Dialog.Header>
            
            <FormProvider {...methods}>

            <form onSubmit={methods.handleSubmit(onSubmit)} >
                <Dialog.Body gap={"20px"}>
                <Flex flexDirection={"column"} gap={"16px"}>
                <InputTexto type='text' nombre="nombre" ejemplo={evento.nombre} titulo='Nombre del evento'  required={false}/>    
                <InputTexto type='' nombre="descripcion" ejemplo={evento.descripcion} titulo='Descripción del evento' required={false} />
                <InputTexto type='date' nombre={"fecha"} ejemplo={evento.fecha} required={false} titulo='Fecha' />

                
                <Heading color={'white'} size={"md"}>Tipos de entrada</Heading>
                {[...Array(cantidad)].map((entrada, index) => (
                    <Flex  flexDirection="column"  key={index}>
                        <InputTexto titulo={`Nombre ${index+1}`} nombre={`tipoEntrada.${index}.nombre`} ejemplo={evento.tipoEntrada[index-1]?.nombre} required={false} type='text'/>
                        <InputTexto titulo={`Precio ${index+1}`} nombre={`tipoEntrada.${index}.precio`} ejemplo={evento.tipoEntrada[index-1]?.precio} required={false} type='number'/>
                        <InputTexto titulo={`Cantidad ${index+1}`} nombre={`tipoEntrada.${index}.cantidadEntradas`} ejemplo={evento.tipoEntrada[index-1]?.cantidadEntradas} required={false} type='number'/>
                        <Button marginTop={"8px"} placeSelf="flex-start" size="xs" variant={'subtle'} type="button" onClick={() => {
                            deleteTipoEntrada(eventoId, index);
                            setCantidad(cantidad -1);
                        }}>Eliminar</Button>
                    </Flex>
                ))}
                <Button placeSelf="flex-start" size="xs" type="button" variant={'subtle'} onClick={() => setCantidad(cantidad +1)}>Agregar entrada</Button>
                </Flex>
            </Dialog.Body>
                
                <Dialog.Footer className='buttons-span'>
                    <Button
                    
                    variant="outline" type="button" onClick={() => setModal(true)}>Cerrar</Button>
                    <Button
                    backgroundColor={"#00AEEF"}
                    type="submit">Actualizar</Button>
                    
                </Dialog.Footer>
                {alertVisible &&(
                        <Alert.Root status="success" size={"sm"} width={"60"} position={"fixed"} bottom={"4"} right={"4"}>
                          <Alert.Indicator />
                          <Alert.Title>Evento editado con éxito</Alert.Title>
                      </Alert.Root>)}
                      {alertErrorVisible &&(
                        <Alert.Root status="warning" size={"sm"} width={"60"} position={"fixed"} bottom={"4"} right={"4"}>
                          <Alert.Indicator />
                          <Alert.Title>No se puedo editar el evento. Vuelva a intentarlo</Alert.Title>
                      </Alert.Root>)}
            </form>
            </FormProvider>
        </Dialog.Content>
    );
}
