import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnAllocatedVehicleComponent } from './un-allocated-vehicle.component';

describe('UnAllocatedVehicleComponent', () => {
  let component: UnAllocatedVehicleComponent;
  let fixture: ComponentFixture<UnAllocatedVehicleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnAllocatedVehicleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnAllocatedVehicleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
