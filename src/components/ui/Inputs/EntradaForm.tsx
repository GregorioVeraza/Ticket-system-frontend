// EntradaForm.tsx
import { Field, Input, NumberInput, Box } from "@chakra-ui/react";
import { useFormContext } from "react-hook-form";

export function EntradaForm({ index, register }: { index: number; register: any }) {
  const {formState: {errors}} = useFormContext();
  return (
    <Box className="inputs">
      
      {/* Nombre */}
      <Field.Root boxSize={"10/12"} invalid={!!errors[`tipoEntrada.${index}.nombre`]}>
        <Field.Label>
          Nombre de la entrada {index + 1}
          <Field.RequiredIndicator />
        </Field.Label>
        <Input
          placeholder="Nombre"
          {...register(`tipoEntrada.${index}.nombre`, { required: "El nombre es requerido" })}
          data-cy={`input-nombre-entrada-${index + 1}`}
        />
        <Field.ErrorText>Debe ingresar el nombre</Field.ErrorText>
      </Field.Root>

      {/* Precio */}
      <Field.Root boxSize={"10/12"} invalid={!!errors[`tipoEntrada.${index}.precio`]}>
        <Field.Label>
          Precio {index + 1}
          <Field.RequiredIndicator />
        </Field.Label>
        <NumberInput.Root min={0} width="200px">
          <NumberInput.Input
            {...register(`tipoEntrada.${index}.precio`, { required: "El precio es requerido" })}
            data-cy={`input-precio-entrada-${index + 1}`}
          />
        </NumberInput.Root>
        <Field.ErrorText>Debe ingresar un precio</Field.ErrorText>
      </Field.Root>

      {/* Cantidad */}
      <Field.Root boxSize={"10/12"} invalid={!!errors[`tipoEntrada.${index}.cantidadEntradas`]}>
        <Field.Label>
          Cantidad disponible {index + 1}
          <Field.RequiredIndicator />
        </Field.Label>
        <NumberInput.Root min={0} width="200px">
          <NumberInput.Input
            {...register(`tipoEntrada.${index}.cantidadEntradas`, { required: "La cantidad es requerida" })}
            data-cy={`input-cantidad-entrada-${index + 1}`}
          />
        </NumberInput.Root>
        <Field.ErrorText>Debe ingresar una cantidad</Field.ErrorText>
      </Field.Root>

    </Box>
  );
}
