import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecruitmentBannerComponent } from './recruitment-banner.component';

describe('RecruitmentBannerComponent', () => {
  let component: RecruitmentBannerComponent;
  let fixture: ComponentFixture<RecruitmentBannerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecruitmentBannerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecruitmentBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
