import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Creditosp3Component } from './creditosp3.component';

describe('Creditosp3Component', () => {
  let component: Creditosp3Component;
  let fixture: ComponentFixture<Creditosp3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Creditosp3Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Creditosp3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
