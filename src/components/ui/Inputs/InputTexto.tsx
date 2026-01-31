import {Input, Field} from '@chakra-ui/react';
import { useEffect } from 'react';
import {useFormContext, type FieldError, type FieldErrors, type FieldErrorsImpl, type FieldValues, type Merge} from 'react-hook-form'

type Props={
    titulo: string;
    nombre: string;
    required: string | boolean;
    type?: string;
    mensajeError?: string;
    ejemplo?: string;
    error?: FieldError | Merge<FieldError, FieldErrorsImpl<any>> | undefined;
}
export function InputTexto({error, mensajeError, nombre, required, titulo, ejemplo, type}: Props){
    const {register, watch} = useFormContext();
    const valor = watch(nombre); // ✅ Reactivo

  useEffect(() => {
    console.log("input:", valor);
  }, [valor]); // ✅ Se actualiza correctamente
    return (
        <Field.Root boxSize={"10/12"} invalid={!!error}>
            <Field.Label>
                {titulo}{required && <Field.RequiredIndicator/>}
            </Field.Label>
            <Input  type={type} placeholder={ejemplo} {...register(nombre, { required: required })}></Input>
            <Field.ErrorText>{mensajeError}</Field.ErrorText>
        </Field.Root>
    );
}