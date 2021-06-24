interface _Servicio {
    id: number | null
    servicio_nombre: string
}

class Servicio implements _Servicio{
    id: number | null = null
    servicio_nombre = ''

    setData(data: _Servicio){
        this.id = data.id
        this.servicio_nombre = data.servicio_nombre
    }

    clearData(){
        this.id = null
        this.servicio_nombre = ''
    }
}

export {Servicio, _Servicio}