import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Creditosp2Component } from './creditosp2.component';

describe('Creditosp2Component', () => {
  let component: Creditosp2Component;
  let fixture: ComponentFixture<Creditosp2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Creditosp2Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Creditosp2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
