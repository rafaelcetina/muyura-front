import Json from '@/types/json'
interface _Usuario {
    id: number | null
    uuid: string
    nombre: string
    apellido1: string
    apellido2: string
    telefono: string
    cedula: string | null
    institucion: string | null
    rfc: string
    sexo: string
    fecha_nacimiento: Date | null
    tipo_usuario: string
    servicio_id: number | null
    unidad_id: number | null
    estatus: boolean | number
    email: string
    username: string
}

class Usuario implements _Usuario{
    id = null
    uuid = ''
    nombre = ''
    apellido1 = ''
    apellido2 = ''
    telefono = ''
    cedula = ''
    institucion = ''
    rfc = ''
    sexo = ''
    fecha_nacimiento = null
    tipo_usuario = ''
    servicio_id = null
    unidad_id = null
    estatus = false
    email = ''
    username = ''

    setData(data: Json){

    }
}

export {_Usuario,Usuario}