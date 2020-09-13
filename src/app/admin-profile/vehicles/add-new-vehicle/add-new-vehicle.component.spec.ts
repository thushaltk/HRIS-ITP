import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewVehicleComponent } from './add-new-vehicle.component';

describe('AddNewVehicleComponent', () => {
  let component: AddNewVehicleComponent;
  let fixture: ComponentFixture<AddNewVehicleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddNewVehicleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNewVehicleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
