import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PruebaClienteComponent } from './prueba-cliente.component';

describe('PruebaClienteComponent', () => {
  let component: PruebaClienteComponent;
  let fixture: ComponentFixture<PruebaClienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PruebaClienteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PruebaClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
