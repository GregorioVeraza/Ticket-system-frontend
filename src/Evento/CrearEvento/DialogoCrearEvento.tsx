import { Button, CloseButton, Dialog, Portal, IconButton, Alert, Flex } from "@chakra-ui/react";
import { useForm, FormProvider } from "react-hook-form";
import { CrearEventos } from "./CrearEventos";
import { useState } from "react";
import { useEventos } from "../../contexts/EventosContext";
import type { EventoTipo } from "../../types/TipoEvento";

export function DialogoCrearEvento() {
  const methods = useForm<EventoTipo>({ 
    mode: 'onChange',
    reValidateMode: 'onChange',
    shouldFocusError: true
  });
  const [isOpen, setIsOpen] = useState(false);
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertErrorVisible, setAlertErrorVisible] = useState(false);
  const { crearEvento, loading } = useEventos();

  const onSubmit = async (data: any) => {
    try {
      console.log("Datos del formulario:", data);
      await crearEvento(data);
      setIsOpen(false);
      methods.reset();
      setAlertVisible(true);
      setTimeout(() => setAlertVisible(false), 3000);
    } catch (err) {
      setAlertErrorVisible(true);
      console.error("Error al crear el evento:", err);
    }
  };
  const onError = async (data: any) => {
    console.error("Errores en el formulario:", data);
  }

  return (
    <Dialog.Root
      open={isOpen}
      onOpenChange={(open) => setIsOpen(open)}
      trapFocus={true}
    >
      <Dialog.Trigger asChild data-cy="crear-evento-button">
        <IconButton
          variant="outline"
          size="sm"
          rounded="full"
          background="black"
          onClick={() => setIsOpen(true)}
        >
          +
        </IconButton>
      </Dialog.Trigger>

      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header display={"flex"} justifyContent={"space-between"} alignItems={"center"} >
              <Dialog.Title color="white">Crear evento</Dialog.Title>
              <CloseButton size="sm" onClick={() => setIsOpen(false)} placeSelf={"flex-end"} justifySelf={"flex-end"}/>
            </Dialog.Header>

            <FormProvider {...methods}>
              <form onSubmit={methods.handleSubmit(onSubmit, onError)}>
                <Dialog.Body>
                  <CrearEventos error={methods.formState.errors}/>
                </Dialog.Body>

                <Dialog.Footer>
                  <Button variant="outline" onClick={() => setIsOpen(false)}>
                    Cancelar
                  </Button>
                  <Button type="submit" >
                    Guardar
                  </Button>
                </Dialog.Footer>
              </form>
            </FormProvider>

            
              
            
          </Dialog.Content>
        </Dialog.Positioner>
        {alertVisible &&(
        <Alert.Root status="success" size={"sm"} width={"60"} position={"fixed"} bottom={"4"} right={"4"}>
          <Alert.Indicator />
          <Alert.Title>Evento creado con éxito</Alert.Title>
      </Alert.Root>)}
      {alertErrorVisible &&(
        <Alert.Root status="warning" size={"sm"} width={"60"} position={"fixed"} bottom={"4"} right={"4"}>
          <Alert.Indicator />
          <Alert.Title>No se puedo crear el evento. Vuelva a intentarlo</Alert.Title>
      </Alert.Root>)}
      </Portal>
      
    </Dialog.Root>
    
  );
}
