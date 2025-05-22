import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageBoxSectionComponent } from './image-box-section.component';

describe('ImageBoxSectionComponent', () => {
  let component: ImageBoxSectionComponent;
  let fixture: ComponentFixture<ImageBoxSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImageBoxSectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImageBoxSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
