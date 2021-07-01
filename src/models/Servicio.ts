interface _Servicio {
    id: number | null
    servicio_nombre: string
    servicio_code: string
}

class Servicio implements _Servicio{
    id: number | null = null
    servicio_nombre = ''
    servicio_code = ''

    setData(data: _Servicio){
        this.id = data.id
        this.servicio_nombre = data.servicio_nombre
        this.servicio_code = data.servicio_code
    }

    clearData(){
        this.id = null
        this.servicio_nombre = ''
        this.servicio_code = ''
    }
}

export {Servicio, _Servicio}