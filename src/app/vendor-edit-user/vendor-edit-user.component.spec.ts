import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorEditUserComponent } from './vendor-edit-user.component';

describe('VendorEditUserComponent', () => {
  let component: VendorEditUserComponent;
  let fixture: ComponentFixture<VendorEditUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VendorEditUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VendorEditUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
