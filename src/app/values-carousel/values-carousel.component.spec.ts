import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValuesCarouselComponent } from './values-carousel.component';

describe('ValuesCarouselComponent', () => {
  let component: ValuesCarouselComponent;
  let fixture: ComponentFixture<ValuesCarouselComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ValuesCarouselComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ValuesCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
