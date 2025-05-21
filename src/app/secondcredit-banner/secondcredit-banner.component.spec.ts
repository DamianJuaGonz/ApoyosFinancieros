import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecondcreditBannerComponent } from './secondcredit-banner.component';

describe('SecondcreditBannerComponent', () => {
  let component: SecondcreditBannerComponent;
  let fixture: ComponentFixture<SecondcreditBannerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SecondcreditBannerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SecondcreditBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
