import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CabeceraTodosComponent } from './cabecera-todos.component';

describe('CabeceraTodosComponent', () => {
  let component: CabeceraTodosComponent;
  let fixture: ComponentFixture<CabeceraTodosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CabeceraTodosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CabeceraTodosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
