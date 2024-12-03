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
    tipo ?: Tipo,
    curtiembre ?: Curtiembre,
}

export interface MaterialCar{
    material: Material,
    precio: number,
    tipo: Tipo,
}

export interface Car{
    material: MaterialCar[],
    precioTotal?: number ,

}

export interface Venta{
    id: number,
    fecha: string,
    totalVenta: number,
    usuario: User,
}

export interface VentaMaterial{
    idVenta: number,
    idMaterial: number,
    material: Material,
    venta?: Venta,
}

export interface User{
    id: number,
    nombre: string,
    apelldo: string,
    email: string,
    password: string,
    rol: string,
    activo: boolean,
    numero: string,
}

export interface PlotVenta{
    tipoMaterial: string,
    totalVenta: number,
    totalIngreso: number,
}