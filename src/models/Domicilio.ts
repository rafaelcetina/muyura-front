interface _Domicilio{
    codigo_postal: string
    entidad_id: number | null
    municipio_id: number | null
    localidad_id: number | null
    asentamiento: string
    tipo_vialidad_id: number | null
    vialidad: string
    numero: string
    cruzamiento1: string
    cruzamiento2: string
    cruzamiento3: string
}

class Domicilio implements _Domicilio{
    codigo_postal: string
    entidad_id: number | null
    municipio_id: number | null
    localidad_id: number | null
    asentamiento: string
    tipo_vialidad_id: number | null
    vialidad: string
    numero: string
    cruzamiento1: string
    cruzamiento2: string
    cruzamiento3: string

    constructor() {
        this.codigo_postal = ''
        this.entidad_id = 14
        this.municipio_id = null
        this.localidad_id = null
        this.asentamiento = ''
        this.tipo_vialidad_id = null
        this.vialidad = ''
        this.numero = ''
        this.cruzamiento1 = ''
        this.cruzamiento2 = ''
        this.cruzamiento3 = ''
    }
}

export {Domicilio, _Domicilio}