import { TestBed } from '@angular/core/testing';

import { VehiclesServices } from './vehicle.service';

describe('VehiclesServices', () => {
  let service: VehiclesServices;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VehiclesServices);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
