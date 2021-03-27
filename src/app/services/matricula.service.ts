import { Injectable } from '@angular/core';
import { Estudiante } from '../models/estudiante';

@Injectable({
  providedIn: 'root'
})
export class MatriculaService {

  constructor() { }

  obtenerEstudiantes(): Array<Estudiante> {
    const estudiantesStr = localStorage.getItem('estudiantes');
      let listaEstudiantes: Array<Estudiante>;
      if (!estudiantesStr)
      {
        listaEstudiantes = []
      } else {
        listaEstudiantes = JSON.parse(estudiantesStr as string) as Array<Estudiante>;
      }
    
      return listaEstudiantes;
    }

  obtenerPresupuesto(): number {
    const presupuestoStr = localStorage.getItem('presupuesto');
    let presupuesto = 100000000;
    if (!presupuestoStr) {
      this.actualizarPresupuesto(presupuesto);
    } else {
      presupuesto = +JSON.parse(presupuestoStr);
    }

    return presupuesto;
  }

  actualizarPresupuesto(presupuesto: number): void {
    localStorage.setItem('presupuesto', JSON.stringify(presupuesto));
  }

  guardarEstudiante(estudiante: Estudiante): string {

    const estudiantesStr = localStorage.getItem('estudiantes');
      let listaEstudiantes: Array<Estudiante>;
      if (!estudiantesStr)
      {
        listaEstudiantes = []
      } else {
        listaEstudiantes = JSON.parse(estudiantesStr as string) as Array<Estudiante>;
      }

      for (let i = 0; i < listaEstudiantes.length; i++) {
        if (listaEstudiantes[i].id === estudiante.id){
          return 'El estudiante ya está registrado.';
        }
      }

      if (estudiante.grupoSisben === 'A' || estudiante.grupoSisben === 'B') {
        estudiante.valorDescuento = 1;
      } else if (estudiante.grupoSisben == 'C') {
        estudiante.valorDescuento = 0.6;
      } else {
        estudiante.valorDescuento = 0;
      }

      estudiante.totalAPagar = estudiante.valorMatricula * (1 - estudiante.valorDescuento);
      estudiante.valorDescontado = (estudiante.valorDescuento * estudiante.valorMatricula);
      let presupuesto = this.obtenerPresupuesto();
      if ((presupuesto - estudiante.valorDescontado) < 0) {
        return 'No hay presupuesto suficiente';
      }
      
      presupuesto -= estudiante.valorDescontado;
      
      this.actualizarPresupuesto(presupuesto);
      listaEstudiantes.push(estudiante);
      localStorage.setItem('estudiantes', JSON.stringify(listaEstudiantes));
      return '';
  }
  
}
