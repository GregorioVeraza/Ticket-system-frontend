import { Entrada } from "./Entrada";
import { useEffect, useState } from "react";
import {  useParams } from "react-router-dom";
import '../css/VerEntrada.css'
import { Flex, Heading, Button, Box } from "@chakra-ui/react";
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react';
import api from "../../api/api";

type GetEntradas ={
    nombre: string;
    precio: number;
    cantidadEntradas: number;
}
type prop ={
    nombre: string;
    id: string;
}



export function VerEntarada(){
  // Inicializa Mercado Pago con tu Public Key
    initMercadoPago('APP_USR-e03b07b9-dc41-4994-9c98-eff4f3a284c9');
    const [preferenceId, setPreferenceId] = useState<string>('');
    const [ entradas, setEntradas] = useState<GetEntradas[]>([]);
    const [total, setTotal] = useState(0);
    const {nombre, id} = useParams<prop>();
    const [abrirMercadoPago, setAbrirMercadoPago] = useState(false);
    async function fetchEntrada() {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/evento/${nombre}`);
      console.log(response);
      const data: GetEntradas[] = await response.json();
      setEntradas(data);
      console.log(data);
    } catch (error) {
      console.error('Error:', error);
    }
  }
  async function createPreference() {
    console.log("el id del evento es:", id);
    try{
      const items = entradas.map(entrada => ({
        title: entrada.nombre,
        quantity: entrada.cantidadEntradas,
        unit_price: entrada.precio,
      }));

      const response = await api.post("/mercado-pago/preference", { items: items,  eventoId: id });//no se envia el idd del evento
      const data = response.data;
      console.log(data.ok);
      console.log(data);
      //if (data.ok){
      console.log('Preference ID:', data.initPoint);
      console.log('Preference ID:', data.initPoint.id);
     
      setPreferenceId(data.initPoint.id);
      setAbrirMercadoPago(true);
      //navigate(data.initPoint.init_point);
      console.log("preference id seteado", preferenceId);
      //}
    } catch (error) {
      console.error('Error:', error);
    }
    
  }


  useEffect(() => {
    fetchEntrada();
    }, []);
    
  
 return (
    <Flex  direction={"column"} width={"90%"} margin={"auto"} gap={"20px"} borderRadius={"2xl"}>
        <h1>Selección sector</h1>
        <div className="contenedor-ver-entrada">
        {
            entradas.map((entrada, index) => (
                <Entrada 
                key={index}
                nombre={entrada.nombre}
                precio={entrada.precio}
                cantidadEntradas={entrada.cantidadEntradas}
                setTotal={setTotal}
                total={total}
                />
                ))
        }
        </div>
        <Box className="pagar" id="pagar-entrada" flex={"true"} alignItems={"center"} padding={"10px"} borderRadius={"lg"} backgroundColor={"blue.950"}>
          <Heading color={"white"}>Total: ${total}</Heading>
          
          
  
          <Button size={"xs"} onClick={() => {
            
            createPreference();
            
          }}>Pagar</Button><div>
            {/*abrirMercadoPago &&<link rel="stylesheet" href={preferenceId} />*/}
            {/* Renderiza el botón de pago */}
        {abrirMercadoPago &&<Wallet  initialization={{  preferenceId: preferenceId}} />}
          </div>
        </Box>
    </Flex>
);
}