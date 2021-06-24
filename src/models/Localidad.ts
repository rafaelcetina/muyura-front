interface _Localidad {
    cve_ent: number | null
    cve_mun: number | null
    cve_loc: number | null
    nom_loc: string
}

class Localidad implements _Localidad{
    cve_ent: number | null = null
    cve_mun: number | null = null
    cve_loc: number | null = null
    nom_loc = ''
}

export {Localidad, _Localidad}