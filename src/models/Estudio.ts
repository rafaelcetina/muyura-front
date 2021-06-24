interface _Estudio {
    id: number | null
    estudio_nombre: string
    estudio_estatus: boolean | number
}

class Estudio implements _Estudio{
    id: number | null = null
    estudio_nombre = ''
    estudio_estatus: boolean | number = true

    setData(data: _Estudio){
        this.id = data.id
        this.estudio_nombre = data.estudio_nombre
        this.estudio_estatus = data.estudio_estatus
    }

    clearData(){
        this.id = null
        this.estudio_nombre = ''
        this.estudio_estatus = true
    }
}

export {Estudio, _Estudio}