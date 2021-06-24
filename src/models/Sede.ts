interface _Sede {
    id: number | null
    region_id: number | null
    fecha_apertura: Date | null
    fecha_cierre: Date | null
    nombre: string
    entidad_id: number | null
    municipio_id: number | null
    localidad_id: number | null
    codigo_postal: string
    direccion: string
    latitud: string
    longitud: string
}

class Sede implements _Sede{
    id: number | null = null
    region_id: number | null = null
    fecha_apertura: Date | null = null
    fecha_cierre: Date | null = null
    nombre = ''
    entidad_id: number | null = null
    municipio_id: number | null = null
    localidad_id: number | null = null
    codigo_postal = ''
    direccion = ''
    latitud = ''
    longitud = ''

}

export {Sede, _Sede}