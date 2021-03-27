import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Estudiante } from 'src/app/models/estudiante';
import { MatriculaService } from 'src/app/services/matricula.service';

@Component({
  selector: 'app-registro-estudiante',
  templateUrl: './registro-estudiante.component.html',
  styleUrls: ['./registro-estudiante.component.css']
})
export class RegistroEstudianteComponent implements OnInit {
  matriculaForm: FormGroup;
  presupuesto: number = 100000000;

  constructor(private formBuilder: FormBuilder, private matriculaService: MatriculaService) { 
    this.matriculaForm = this.formBuilder.group({
      id: ['', Validators.required],
      nombre: ['', Validators.required],
      grupoSisben: ['', Validators.required],
      valorMatricula: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.presupuesto = this.matriculaService.obtenerPresupuesto();
  }

  registrarEstudiante(): void {
    if (this.matriculaForm.valid) {
      const estudiante: Estudiante = {
        id: this.matriculaForm.controls['id'].value,
        nombre: this.matriculaForm.controls['nombre'].value,
        grupoSisben: this.matriculaForm.controls['grupoSisben'].value,
        valorMatricula: +this.matriculaForm.controls['valorMatricula'].value,
      };

      const resultado = this.matriculaService.guardarEstudiante(estudiante);
      if (resultado) {
        alert(resultado);
      } else {
        this.matriculaForm.controls['id'].setValue('');
        this.matriculaForm.controls['nombre'].setValue('');
        this.matriculaForm.controls['grupoSisben'].setValue('');
        this.matriculaForm.controls['valorMatricula'].setValue('');
      }
    }
  }

}
