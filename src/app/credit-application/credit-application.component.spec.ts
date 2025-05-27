import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreditApplicationComponent } from './credit-application.component';

describe('CreditApplicationComponent', () => {
  let component: CreditApplicationComponent;
  let fixture: ComponentFixture<CreditApplicationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreditApplicationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreditApplicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
