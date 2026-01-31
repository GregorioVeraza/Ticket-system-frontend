import {Box, Text, Button, Icon, Flex, Heading} from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import {AiOutlineCheckCircle} from 'react-icons/ai';

export function PagoExitoso(){
    const navigate =useNavigate();
    return(
        <Flex p={4} direction="column" placeSelf="center" alignItems="flex-start" width="50%" justifyContent="center" gap={6} backgroundColor="green.100" boxShadow="md" borderRadius="md" mt={10}>
            <Flex width="100%" justifyContent="space-between" alignItems="center">
                <Flex direction="column" gap={4} alignSelf="center">
                    <Heading fontSize="4xl" fontWeight="bold" color="cyan.950">¡Pago Exitoso!</Heading>
                    <Text color="cyan.950">Gracias por tu compra.</Text>
                </Flex>
                <Icon placeSelf="flex-end">
                    <AiOutlineCheckCircle size={"150"} color="green"/>
                </Icon>
            </Flex>
            <Button placeSelf="flex-start" colorPalette="green" onClick={() => {
                navigate(`/`);
            }}>Volver al inicio</Button>
        </Flex>  
    )
}