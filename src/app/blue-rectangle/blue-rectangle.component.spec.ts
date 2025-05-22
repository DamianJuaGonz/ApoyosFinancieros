import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlueRectangleComponent } from './blue-rectangle.component';

describe('BlueRectangleComponent', () => {
  let component: BlueRectangleComponent;
  let fixture: ComponentFixture<BlueRectangleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BlueRectangleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BlueRectangleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
