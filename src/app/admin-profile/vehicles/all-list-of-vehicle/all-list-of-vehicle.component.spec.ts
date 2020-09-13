import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllListOfVehicleComponent } from './all-list-of-vehicle.component';

describe('AllListOfVehicleComponent', () => {
  let component: AllListOfVehicleComponent;
  let fixture: ComponentFixture<AllListOfVehicleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllListOfVehicleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllListOfVehicleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
