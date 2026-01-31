import { useEffect, useRef } from "react";
import { ActualizarEvento } from "./ActualizarEvento/ActualizarEvento";
import './css/EventoModal.css'
import { ElmininarEvento } from "./EliminarEvento/EliminarEvento";
import { Dialog, Portal } from "@chakra-ui/react";

type Prop = {
  open: boolean;
  setModal: (abrir: boolean) => void;
  isUpdate: boolean;
  eventoId: number;
};

export function EventoModal({ eventoId, isUpdate, setModal , open}: Prop) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (open) {
      if (!dialog.open) dialog.showModal(); // usa el modo modal (con fondo)
    } else {
      if (dialog.open) dialog.close();
    }
  }, [open]);

  return (
    <Dialog.Root open={open} onOpenChange={() => setModal}>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          {isUpdate ? (
            <ActualizarEvento eventoId={eventoId} setModal={() => setModal(false)}/>
            
          ) : (
            <ElmininarEvento eventoId={eventoId} setModal={setModal} />
            
          )}
      </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
}
