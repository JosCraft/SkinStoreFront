export interface Tipo{
    id: number,
    nombre: string,
    precio: number,
    idCategoria: number,
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
    nombre: string,
    numero: number
}

export interface Categoria{
    id: number,
    nombre: string,
    medida: string,
}

export interface Material{
    id: number,
    medida: string,
    idTipo: number,
}

export interface MaterialCar{
    material: Material,
    precio: number,
}

export interface Car{
    material: MaterialCar[],
    precioTotal?: number ,

}