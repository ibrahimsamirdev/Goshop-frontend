import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorEmployeesComponent } from './vendor-employees.component';

describe('VendorEmployeesComponent', () => {
  let component: VendorEmployeesComponent;
  let fixture: ComponentFixture<VendorEmployeesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VendorEmployeesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VendorEmployeesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
