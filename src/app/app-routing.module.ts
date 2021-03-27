import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConsultaMatriculaComponent } from './components/consulta-matricula/consulta-matricula.component';
import { RegistroEstudianteComponent } from './components/registro-estudiante/registro-estudiante.component';

const routes: Routes = [
  {path: 'registro', component: RegistroEstudianteComponent},
  {path: 'consulta', component: ConsultaMatriculaComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
