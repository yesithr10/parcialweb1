import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Estudiante } from 'src/app/models/estudiante';

@Component({
  selector: 'app-registro-estudiante',
  templateUrl: './registro-estudiante.component.html',
  styleUrls: ['./registro-estudiante.component.css']
})
export class RegistroEstudianteComponent implements OnInit {
  matriculaForm: FormGroup;
  presupuesto: number = 100000000;

  constructor(private formBuilder: FormBuilder) { 
    this.matriculaForm = this.formBuilder.group({
      id: ['', Validators.required],
      nombre: ['', Validators.required],
      grupoSisben: ['', Validators.required],
      valorMatricula: [0, Validators.required],
    });
  }

  ngOnInit(): void {
    const presupuestoStr = localStorage.getItem('presupuesto');
    if (!presupuestoStr) {
      localStorage.setItem('presupuesto', JSON.stringify(this.presupuesto));
    } else {
      this.presupuesto = +JSON.parse(presupuestoStr);
    }
  }

  registrarEstudiante(): void {
    if (this.matriculaForm.valid) {
      const estudiante: Estudiante = {
        id: this.matriculaForm.controls['id'].value,
        nombre: this.matriculaForm.controls['nombre'].value,
        grupoSisben: this.matriculaForm.controls['grupoSisben'].value,
        valorMatricula: +this.matriculaForm.controls['valorMatricula'].value,
      };

      const estudiantesStr = localStorage.getItem('estudiantes');
      let listaEstudiantes: Array<Estudiante>;
      if (!estudiantesStr)
      {
        listaEstudiantes = []
      } else {
        listaEstudiantes = JSON.parse(estudiantesStr as string) as Array<Estudiante>;
      }

      let estudianteRegistrado = false;
      for (let i = 0; i < listaEstudiantes.length; i++) {
        if (listaEstudiantes[i].id === estudiante.id){
          alert("Este estudiante ya se encuentra registrado");
          estudianteRegistrado = true;
          break; // Para romper el bucle una vez encontrado un estudiante repetido
        }
      }

      if (!estudianteRegistrado) {
        if (estudiante.grupoSisben === 'A' || estudiante.grupoSisben === 'B') {
          estudiante.valorDescuento = 1;
        } else if (estudiante.grupoSisben == 'C') {
          estudiante.valorDescuento = 0.6;
        } else {
          estudiante.valorDescuento = 0;
        }

        estudiante.totalAPagar = estudiante.valorMatricula * (1 - estudiante.valorDescuento);

        const valorDescontado = (estudiante.valorDescuento * estudiante.valorMatricula);
        if ((this.presupuesto - valorDescontado) > 0) {
          this.presupuesto -= valorDescontado;
          localStorage.setItem('presupuesto', JSON.stringify(this.presupuesto));

          listaEstudiantes.push(estudiante);
          localStorage.setItem('estudiantes', JSON.stringify(listaEstudiantes));
        } else {
          alert('No hay presupuesto suficiente');
        }
      }
    }
  }

}
