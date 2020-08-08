import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorAddProductComponent } from './vendor-add-product.component';

describe('VendorAddProductComponent', () => {
  let component: VendorAddProductComponent;
  let fixture: ComponentFixture<VendorAddProductComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VendorAddProductComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VendorAddProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
