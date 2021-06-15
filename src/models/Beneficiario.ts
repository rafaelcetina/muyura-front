import Domicilio from "@/models/Domicilio";

export default interface Beneficiario {
    id: number,
    uuid: string,
    folio_pulsera: string,
    nombre: string,
    apellido1: string,
    apellido2: string,
    curp: string,
    fecha_nacimiento: Date,
    sexo: string,

    domicilio?: Domicilio,
    estatus: boolean | number
}