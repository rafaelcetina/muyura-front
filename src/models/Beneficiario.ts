import {Domicilio, _Domicilio} from "@/models/Domicilio";

interface _Beneficiario {
    id: number | null
    uuid: string
    folio_pulsera: string
    nombre: string
    apellido1: string
    apellido2: string
    curp: string
    fecha_nacimiento: Date | null
    sexo: string

    domicilio?: _Domicilio
    estatus: boolean | number
}

class Beneficiario implements _Beneficiario{
    id: number | null
    uuid: string
    folio_pulsera: string
    nombre: string
    apellido1: string
    apellido2: string
    curp: string
    fecha_nacimiento: Date | null
    sexo: string

    domicilio?: _Domicilio
    estatus: boolean | number

    constructor() {
        this.id = null
        this.uuid = ''
        this.folio_pulsera = ''
        this.nombre = ''
        this.apellido1 = ''
        this.apellido2 = ''
        this.curp = ''
        this.fecha_nacimiento = null
        this.sexo = ''
        this.domicilio = new Domicilio()
        this.estatus = true
    }
}

export {_Beneficiario, Beneficiario};