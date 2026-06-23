import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Formulario } from './formulario';

describe('Formulario', () => {
  let component: Formulario;
  let fixture: ComponentFixture<Formulario>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Formulario, ReactiveFormsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(Formulario);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('las contraseñas deben coincidir', () => {
    component.formulario.controls['password'].setValue('Clave123');
    component.formulario.controls['confirmarPassword'].setValue('Clave999');
    expect(component.formulario.hasError('noCoinciden')).toBeTruthy();
  });

  it('debe rechazar menores de 13 años', () => {
    component.formulario.controls['fechaNacimiento'].setValue('2020-01-01');
    expect(component.formulario.controls['fechaNacimiento'].hasError('menorDe13')).toBeTruthy();
  });

});