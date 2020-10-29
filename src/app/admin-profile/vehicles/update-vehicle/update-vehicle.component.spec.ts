import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateVehicleComponent } from './update-vehicle.component';

describe('UpdateVehicleComponent', () => {
  let component: UpdateVehicleComponent;
  let fixture: ComponentFixture<UpdateVehicleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateVehicleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateVehicleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
