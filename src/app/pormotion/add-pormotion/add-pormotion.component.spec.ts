import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPormotionComponent } from './add-pormotion.component';

describe('AddPormotionComponent', () => {
  let component: AddPormotionComponent;
  let fixture: ComponentFixture<AddPormotionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddPormotionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPormotionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
