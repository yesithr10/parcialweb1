export interface Estudiante {
    id: string;
    nombre: string;
    grupoSisben: string;
    valorMatricula: number;
    valorDescuento?: number;
    valorDescontado?: number;
    totalAPagar?: number;
}