import { useState } from "react";
import '../css/Entrada.css'
import {Card, Heading, NumberInput, HStack, IconButton, Text} from '@chakra-ui/react';
import { LuMinus, LuPlus } from "react-icons/lu"

type prop = {
    nombre: string;
    precio: number;
    cantidadEntradas: number;
    total: number;
    setTotal: React.Dispatch<React.SetStateAction<number>>;
}
export function Entrada({nombre, precio, cantidadEntradas, total, setTotal}: prop){
    const [cantidad, setCantidad] = useState(0);
    const [disponible, setDisponible] = useState(true);
    function incrementar(){
        if (cantidad >= cantidadEntradas){
            setCantidad(cantidad +1);
            setTotal(total + precio);
        }
    }
    function decrementar(){
        if(cantidad != 0){
            setCantidad(cantidad -1);
            setTotal(total - precio);
        }
    }
    return(
        <Card.Root size="sm" border="1px" borderColor="border.muted" borderRadius="md" boxShadow="sm" backgroundColor="blue.950">
        <Card.Header>
          <Heading size="md" color={"white"}> {nombre}</Heading>
          
        </Card.Header>
        <Card.Body color="fg.muted">
          Precio: ${precio}
          {cantidadEntradas - cantidad == 0 || cantidadEntradas - cantidad == 1 && <Text>Queda {cantidadEntradas - cantidad} entrada</Text>}
          {cantidadEntradas - cantidad > 1 && <Text>Quedan {cantidadEntradas - cantidad} entradas</Text>}
          
        </Card.Body>
        <Card.Footer>
        <NumberInput.Root defaultValue="0" min={0} max={cantidadEntradas} onValueChange={(value) =>{
            if (value.value != '' && value.valueAsNumber <= cantidadEntradas && value.valueAsNumber >=0){
                setTotal(value.valueAsNumber * precio)
            }
        }}>
            <NumberInput.Control />
            <NumberInput.Input />
        </NumberInput.Root>
        </Card.Footer>
      </Card.Root>
      
    );
}