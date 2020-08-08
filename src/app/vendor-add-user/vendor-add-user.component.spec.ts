import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorAddUserComponent } from './vendor-add-user.component';

describe('UserFormComponent', () => {
  let component: VendorAddUserComponent;
  let fixture: ComponentFixture<VendorAddUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VendorAddUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VendorAddUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
