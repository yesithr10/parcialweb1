import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultaMatriculaComponent } from './consulta-matricula.component';

describe('ConsultaMatriculaComponent', () => {
  let component: ConsultaMatriculaComponent;
  let fixture: ComponentFixture<ConsultaMatriculaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsultaMatriculaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultaMatriculaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
