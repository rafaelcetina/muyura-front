interface _Unidad {
    id: number | null
    unidad_nombre: string
    unidad_clave: string
    estatus: boolean | number
}

class Unidad implements _Unidad{
    id: number | null = null
    unidad_nombre = ''
    unidad_clave = ''
    estatus: boolean | number = true

    setData(data: _Unidad){
        this.id = data.id
        this.unidad_nombre = data.unidad_nombre
        this.unidad_clave = data.unidad_clave
        this.estatus = data.estatus
    }

    clearData(){
        this.id = null
        this.unidad_nombre = ''
        this.unidad_clave = ''
        this.estatus = true
    }
}

export {Unidad, _Unidad}