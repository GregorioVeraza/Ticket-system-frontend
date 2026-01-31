import {  useState, type ReactNode } from "react";
import {   IconButton, HStack, Table } from "@chakra-ui/react";
import { LuCheck, LuCross } from "react-icons/lu";

type Staff = {
    mail: string,
    cuentaPendiente: boolean
}
export function ValidarStaff(){
    const [usuarios, setUsuarios] =useState<Staff[]>([
        {
            mail: 'ejemplo1@gmail.com',
            cuentaPendiente: false
        },
        {
            mail: 'ejemplo2@gmail.com',
            cuentaPendiente: false
        }
    ]
    );
    
    function rows(){
        return (
            usuarios.map((usuario) => {
            <Table.Row key={usuario.mail}>
                <Table.Cell>
                    {usuario.mail}
                </Table.Cell>
                <Table.Cell>
                    <HStack>
                        <IconButton colorPalette={"green"}>
                            <LuCheck></LuCheck>
                        </IconButton>
                        <IconButton colorPalette={"red"}>
                            <LuCross></LuCross>
                        </IconButton>
                    </HStack>
                </Table.Cell>
            </Table.Row>
        }));
        
    }

   return (
    <main>
        <Table.Root>
            <Table.Header>
                <Table.ColumnHeader>Email</Table.ColumnHeader>
                <Table.ColumnHeader>Validar</Table.ColumnHeader>
            </Table.Header>
            <Table.Body>
                {rows()}
            </Table.Body>
        </Table.Root>    
    </main>
   );
}