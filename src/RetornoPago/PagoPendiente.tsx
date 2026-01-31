import {Text, Heading, Button, Icon, Flex} from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import {AiOutlineClockCircle } from 'react-icons/ai';

export function PagoPendiente(){
    const navigate =useNavigate();
    return(
            <Flex p={4} direction="column" placeSelf="center" alignItems="flex-start" width="50%" justifyContent="center" gap={6} backgroundColor="yellow.300" boxShadow="md" borderRadius="md" mt={10}>
                <Flex width="100%" justifyContent="space-between" alignItems="center">
                    <Flex direction="column" gap={4} alignSelf="center">
                        <Heading fontSize="4xl" fontWeight="bold" color="cyan.950">¡Pago pendiente!</Heading>
                        <Text color="cyan.950">Esperando que se procese la compra.</Text>
                    </Flex>
                    <Icon placeSelf="flex-end">
                        <AiOutlineClockCircle  size={"150"} color="white"/>
                    </Icon>
                </Flex>
                <Button placeSelf="flex-start" colorPalette="white"  onClick={() => {
                    navigate(`/`);
                }}>Volver al inicio</Button>
            </Flex>  
        )
}