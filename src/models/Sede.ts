import moment from "moment";

interface _Sede {
    id: number | null
    region_id: number | null
    fecha_apertura: string
    fecha_cierre: string
    nombre: string
    entidad_id: number | null
    municipio_id: number | null
    localidad_id: number | null
    codigo_postal: string
    direccion: string
    latitud: number
    longitud: number
}

class Sede implements _Sede{
    id: number | null = null
    region_id: number | null = null
    fecha_apertura = moment().format('YYYY-MM-DD')
    fecha_cierre = ''
    nombre = ''
    entidad_id = 14
    municipio_id: number | null = null
    localidad_id: number | null = null
    codigo_postal = ''
    direccion = ''
    latitud = 0
    longitud = 0

}

export {Sede, _Sede}