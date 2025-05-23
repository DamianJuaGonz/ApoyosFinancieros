import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrgChartPlaceholderComponent } from './org-chart-placeholder.component';

describe('OrgChartPlaceholderComponent', () => {
  let component: OrgChartPlaceholderComponent;
  let fixture: ComponentFixture<OrgChartPlaceholderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrgChartPlaceholderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrgChartPlaceholderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
