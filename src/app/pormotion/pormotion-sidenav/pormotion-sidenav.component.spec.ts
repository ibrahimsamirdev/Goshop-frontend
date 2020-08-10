import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PormotionSidenavComponent } from './pormotion-sidenav.component';

describe('PormotionSidenavComponent', () => {
  let component: PormotionSidenavComponent;
  let fixture: ComponentFixture<PormotionSidenavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PormotionSidenavComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PormotionSidenavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
