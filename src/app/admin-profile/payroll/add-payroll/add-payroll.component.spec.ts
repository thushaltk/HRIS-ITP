import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPayrollComponent } from './add-payroll.component';

describe('AddPayrollComponent', () => {
  let component: AddPayrollComponent;
  let fixture: ComponentFixture<AddPayrollComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddPayrollComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPayrollComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
