import '../css/CrearEventos.css';
import { useFormContext, type FieldErrors, type FieldValues } from "react-hook-form";
import { useEffect, useState } from "react";
import {
  Input,
  Field,
  Textarea,
  NumberInput,
  Image,
  FileUpload,
} from "@chakra-ui/react";
import { InputTexto } from "../../components/ui/Inputs/InputTexto";
import { UploadManual } from "../../components/ui/Inputs/ImageUploader";
import { EntradaForm } from "../../components/ui/Inputs/EntradaForm";
interface prop{
  error?: FieldErrors<FieldValues>;
}

export function CrearEventos({ error }: prop) {
  const { register, watch, setValue, formState } = useFormContext();
  const { errors, isSubmitted } = formState;
  const isInvalidNombre = !!errors.nombre && isSubmitted;

  const cantidadTipos = watch("cantidadEntradas") || 0;
  const [cantidad, setCantidad] = useState(0);

  console.log("Errores del formulario:", errors);
  useEffect(() => {
    console.log("Formulario inválido:", errors);
    setCantidad(parseInt(cantidadTipos, 10) || 0);
    console.log(cantidadTipos);
  }, [cantidadTipos]);

  return (
    <main className="formulario-crear-evento">
      <InputTexto error={errors.nombre}
        titulo="Nombre"
        nombre="nombre"
        required={"El nombre es requerido"}
        mensajeError="Debe ingresar el nombre"
        data-cy="input-nombre"
      />

      {/* FECHA */}
      <Field.Root boxSize={"10/12"} invalid={!!errors.fecha?.message}>
        <Field.Label>
          Fecha <Field.RequiredIndicator />
        </Field.Label>
        <Input type="date" aria-invalid={!!errors.fecha?.message} {...register("fecha", { required: "La fecha es requerida" })} data-cy="input-fecha" />
        {!!error.fecha  && <Field.ErrorText>{errors.fecha.message}</Field.ErrorText>}
      </Field.Root>

      {/* DESCRIPCIÓN */}
      <Field.Root boxSize={"10/12"} invalid={!!errors.descripcion?.message}>
        <Field.Label>
          Descripción <Field.RequiredIndicator />
        </Field.Label>
        <Textarea aria-invalid={!!errors.descripcion?.message} {...register("descripcion", { required: "La descripción es requerida" })} data-cy="input-descripcion" />
        {errors.descripcion?.message && <Field.ErrorText>{errors.descripcion.message}</Field.ErrorText>}
      </Field.Root>
    {/* UPLOAD IMAGEN */}
    <FileUpload.Root maxFiles={1} invalid={!!errors.imagePublicId?.message}>
    {
      import.meta.env.MODE !== 'test' ? 
        <UploadManual onUpload={() => setValue("imagePublicId", 'sadas')} data-cy="upload-imagen" />
      : 
        <UploadManual onUpload={(url) => setValue("imagePublicId", url)} data-cy="upload-imagen" />
      
    }</FileUpload.Root>
      
    {/*Previsualizacion de imagen*/}
      {watch("imagePublicId") != null && <Image src={`https://res.cloudinary.com/duywuj8o3/image/upload/q_auto/${watch("imagePublicId")}`} />}

    
      {/* CANTIDAD DE TIPOS */}
      <Field.Root boxSize={"10/12"} invalid={!!errors.cantidadEntradas?.message}>
        <Field.Label>
          Cantidad de tipos de entrada <Field.RequiredIndicator />
        </Field.Label>
        <NumberInput.Root min={0} max={10} onValueChange={(value) => setCantidad(value.valueAsNumber || 0)}>
          <NumberInput.Input aria-invalid={!!errors.cantidadEntradas?.message} {...register("cantidadEntradas", { required: "La cantidad de entradas es requerida" })} data-cy="input-cantidad-entradas" />
        </NumberInput.Root>
        {errors.cantidadEntradas?.message && <Field.ErrorText>{errors.cantidadEntradas.message}</Field.ErrorText>}
      </Field.Root>

      {/* LISTA DE COMPONENTES EntradaForm */}
      {Array.from({ length: cantidad}).map((_, i) => (
        <EntradaForm key={i} index={i} register={register} />
      ))}

      
    </main>
  );
}
