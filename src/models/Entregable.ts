interface _Entregable {
    id: number | null
    nombre: string
    descripcion: string
    estatus: boolean | number
}

class Entregable implements _Entregable{
    id: number | null = null
    nombre = ''
    descripcion = ''
    estatus: boolean | number = true

    setData(data: _Entregable){
        this.id = data.id
        this.nombre = data.nombre
        this.descripcion = data.descripcion
        this.estatus = data.estatus
    }

    clearData(){
        this.id = null
        this.nombre = ''
        this.descripcion = ''
        this.estatus = true
    }
}

export {Entregable, _Entregable}