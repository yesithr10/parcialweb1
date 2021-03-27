import { Component, OnInit } from '@angular/core';
import { Estudiante } from 'src/app/models/estudiante';
import { MatriculaService } from 'src/app/services/matricula.service';

@Component({
  selector: 'app-consulta-matricula',
  templateUrl: './consulta-matricula.component.html',
  styleUrls: ['./consulta-matricula.component.css']
})
export class ConsultaMatriculaComponent implements OnInit {
  estudiantes: Array<Estudiante> = [];
  recursosUtilizados: number = 0;
  recursosRestastes: number = 0;

  constructor(private matriculaService: MatriculaService) { }

  ngOnInit(): void {
    this.estudiantes = this.matriculaService.obtenerEstudiantes();
    this.recursosRestastes = this.matriculaService.obtenerPresupuesto();
    for (let index = 0; index < this.estudiantes.length; index++) {
      this.recursosUtilizados += this.estudiantes[index].valorDescontado ?? 0;
    }
  }
}
