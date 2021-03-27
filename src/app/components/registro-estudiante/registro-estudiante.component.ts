import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-registro-estudiante',
  templateUrl: './registro-estudiante.component.html',
  styleUrls: ['./registro-estudiante.component.css']
})
export class RegistroEstudianteComponent implements OnInit {
  matriculaForm: FormGroup;

  constructor(private formBuilder: FormBuilder) { 
    this.matriculaForm = this.formBuilder.group({
      id: ['', Validators.required],
      nombre: ['', Validators.required],
      grupoSisben: ['', Validators.required],
      valorMatricula: [0, Validators.required],
    });
  }

  ngOnInit(): void {
    
  }

}
