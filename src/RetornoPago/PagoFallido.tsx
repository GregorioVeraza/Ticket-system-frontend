import {Text, Heading, Button, Icon, Flex} from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import {AiOutlineCloseCircle } from 'react-icons/ai';

export function PagoFallido(){
    const navigate =useNavigate();
    return(
            <Flex p={4} direction="column" placeSelf="center" alignItems="flex-start" width="50%" justifyContent="center" gap={6} backgroundColor="red.100" boxShadow="md" borderRadius="md" mt={10}>
                <Flex width="100%" justifyContent="space-between" alignItems="center">
                    <Flex direction="column" gap={4} alignSelf="center">
                        <Heading fontSize="4xl" fontWeight="bold" color="cyan.950">¡Pago Fallido!</Heading>
                        <Text color="cyan.950">Vuelva a intentarlo.</Text>
                    </Flex>
                    <Icon placeSelf="flex-end">
                        <AiOutlineCloseCircle size={"150"} color="red"/>
                    </Icon>
                </Flex>
                <Button placeSelf="flex-start" colorPalette="red" onClick={() => {
                    navigate(`/`);
                }}>Volver al inicio</Button>
            </Flex>  
        )
}