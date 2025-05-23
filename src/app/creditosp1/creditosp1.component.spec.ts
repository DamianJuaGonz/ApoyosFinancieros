import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Creditosp1Component } from './creditosp1.component';

describe('Creditosp1Component', () => {
  let component: Creditosp1Component;
  let fixture: ComponentFixture<Creditosp1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Creditosp1Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Creditosp1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
