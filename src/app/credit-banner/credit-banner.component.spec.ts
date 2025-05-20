import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreditBannerComponent } from './credit-banner.component';

describe('CreditBannerComponent', () => {
  let component: CreditBannerComponent;
  let fixture: ComponentFixture<CreditBannerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreditBannerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreditBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
