export type EventoTipo ={
    _id: number;
    nombre: string;
    fecha: string | Date;
    descripcion: string;
    tipoEntrada: {
        nombre: string;
        precio: number;
        cantidadEntradas: number;
    }[]
    imagePublicId: string;
}