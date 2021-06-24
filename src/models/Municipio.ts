interface _Municipio {
    cve_ent: number | null
    cve_mun: number | null
    nom_mun: string
}

class Municipio implements _Municipio{
    cve_ent: number | null = null
    cve_mun: number | null = null
    nom_mun = ''
}

export {Municipio, _Municipio}