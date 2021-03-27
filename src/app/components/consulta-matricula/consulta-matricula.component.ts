import { Component, OnInit } from '@angular/core';
import { Estudiante } from 'src/app/models/estudiante';

@Component({
  selector: 'app-consulta-matricula',
  templateUrl: './consulta-matricula.component.html',
  styleUrls: ['./consulta-matricula.component.css']
})
export class ConsultaMatriculaComponent implements OnInit {
  estudiantes: Array<Estudiante> = [];
  recursosUtilizados: number = 0;
  recursosRestastes: number = 0;
  constructor() { }

  ngOnInit(): void {
    const estudiantesStr = localStorage.getItem('estudiantes');
      let listaEstudiantes: Array<Estudiante>;
      if (!estudiantesStr)
      {
        listaEstudiantes = []
      } else {
        listaEstudiantes = JSON.parse(estudiantesStr as string) as Array<Estudiante>;
      }
    this.estudiantes = listaEstudiantes;

    for (let index = 0; index < this.estudiantes.length; index++) {
      this.recursosUtilizados += this.estudiantes[index].valorDescontado ?? 0;
    }

    const recursosStr = localStorage.getItem('presupuesto');
    this.recursosRestastes = +JSON.parse(recursosStr ?? '0');
  }

}
