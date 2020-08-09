import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PormotionComponent } from './pormotion.component';

describe('PormotionComponent', () => {
  let component: PormotionComponent;
  let fixture: ComponentFixture<PormotionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PormotionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PormotionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
