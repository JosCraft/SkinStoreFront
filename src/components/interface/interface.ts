export interface Tipo{
    id: number,
    nombre: string,
    precio: number,
    medida: string,
    idColor: number,
    idCurtiembre: number,
    color: Color,
    curtiembre: Curtiembre
}

export interface Color{
    id: number,
    nombre: string,
    hex: string
}

export interface Curtiembre{
    id: number,
    nombre: string
    numero: number
}

