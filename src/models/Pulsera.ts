interface _Pulsera {
    id: number | null
    lote: string
    fecha_registro: Date | null
    folio_inicial: number
    folio_final: number
    total: number
    disponibles: number
    asignadas: number
    inactivas: number
}

class Pulsera implements _Pulsera{
    id: number | null = null
    lote = ''
    fecha_registro: Date | null = null
    folio_inicial = 0
    folio_final = 0
    total = 0
    disponibles = 0
    asignadas = 0
    inactivas = 0

    setData(data: _Pulsera){
        this.id = data.id
        this.lote = data.lote
        this.fecha_registro = data.fecha_registro
        this.folio_inicial = data.folio_final
        this.folio_final = data.folio_final
        this.total = data.total
        this.disponibles = data.disponibles
        this.asignadas = data.asignadas
        this.inactivas = data.inactivas
    }

    clearData(){
        this.id = null
        this.lote = ''
        this.fecha_registro = null
        this.folio_inicial = 0
        this.folio_final = 0
        this.total = 0
        this.disponibles = 0
        this.asignadas = 0
        this.inactivas = 0
    }
}

export {Pulsera, _Pulsera}