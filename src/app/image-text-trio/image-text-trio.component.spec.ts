import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageTextTrioComponent } from './image-text-trio.component';

describe('ImageTextTrioComponent', () => {
  let component: ImageTextTrioComponent;
  let fixture: ComponentFixture<ImageTextTrioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImageTextTrioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImageTextTrioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
