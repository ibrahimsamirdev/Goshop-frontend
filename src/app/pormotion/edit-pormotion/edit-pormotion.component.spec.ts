import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPormotionComponent } from './edit-pormotion.component';

describe('EditPormotionComponent', () => {
  let component: EditPormotionComponent;
  let fixture: ComponentFixture<EditPormotionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditPormotionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditPormotionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
