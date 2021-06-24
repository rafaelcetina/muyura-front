interface _Region {
    id: number | null
    nombre: string
    clave: string
}

class Region implements _Region{
    id: number | null = null
    nombre = ''
    clave = ''

    setData(data: _Region){
        this.id = data.id
        this.nombre = data.nombre
        this.clave = data.clave
    }

    clearData(){
        this.id = null
        this.nombre = ''
        this.clave = ''
    }
}

export {Region, _Region}