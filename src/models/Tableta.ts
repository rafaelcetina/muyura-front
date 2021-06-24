interface _Tableta {
    id: number | null
    marca: string
    modelo: string
    no_serie: string
    mac: string
    imei: string
    usuario_id: number | null
    estatus: boolean | number
}

class Tableta implements _Tableta{
    id: number | null = null
    marca = ''
    modelo = ''
    no_serie = ''
    mac = ''
    imei = ''
    usuario_id: number | null = null
    estatus: boolean | number = true

}

export {Tableta, _Tableta}