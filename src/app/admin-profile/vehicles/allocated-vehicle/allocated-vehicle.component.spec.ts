import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllocatedVehicleComponent } from './allocated-vehicle.component';

describe('AllocatedVehicleComponent', () => {
  let component: AllocatedVehicleComponent;
  let fixture: ComponentFixture<AllocatedVehicleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllocatedVehicleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllocatedVehicleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
