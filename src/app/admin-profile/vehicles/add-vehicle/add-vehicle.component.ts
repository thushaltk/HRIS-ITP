import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { VehiclesServices } from 'src/app/_services/vehicle.service';
import { ToastrService } from 'ngx-toastr';
import { Vehicle } from '../../../_models/vehicle.model';
import { Employees } from 'models/employees.model';

@Component({
  selector: 'app-add-vehicle',
  templateUrl: './add-vehicle.component.html',
  styleUrls: ['./add-vehicle.component.css']
})
export class AddVehicleComponent implements OnInit {
  form: FormGroup;
  submitted: boolean = false;
  @Output() listComponent = new EventEmitter<any>();
  @Output() update = new EventEmitter<any>();
  @Input() vehicle: Vehicle;
  @Input() employee: Employees;
  employees: any[] = [];
  vehicles: any[] = [];
  constructor(
    private fb: FormBuilder,
    private vehiclesServices: VehiclesServices,
    private toastr: ToastrService,
  ) { }


  ngOnInit(): void {
    this.form = this.fb.group({
      _id: '',
      vehicleNumber: new FormControl('', Validators.required),
      vehicleType: new FormControl('', Validators.required),
      vehicleChaseNumber: new FormControl('', Validators.required),
      vehicleEngineNumber: new FormControl('', Validators.required),
      manufactureDate: new FormControl('', Validators.required),
      vehicleColor: new FormControl('', Validators.required),
      vehiclePurchaseDate: new FormControl('', Validators.required),
      vehicleOpenMileage: new FormControl('', Validators.required),
      insuranceType: new FormControl('', Validators.required),
      vehicleRegisteredDistrict: new FormControl('', Validators.required),
      nextLicenseRenewalDate: new FormControl('', Validators.required),
      vehiclePreviousOwner: new FormControl('', Validators.required),
      NIC: new FormControl('', Validators.required),
      contactNumber: new FormControl('', Validators.required),
      address: new FormControl('', Validators.required),
      allocation: false,
      employees: new FormControl(' '),
    });
  
    this.getEmployees ();
    if (this.vehicle) {
      this.vehicle.employees = this.vehicle.employees?._id
      this.form.patchValue(this.vehicle);
    }

    this.form.controls.allocation.valueChanges.subscribe((value) => {
      this.toggleAllocation(value);
    });

  }

  get validator() {
    return this.form.controls;
  } 
  
  getEmployees() {
    this.vehiclesServices.getEmployees().subscribe((employees) => {
      console.log(employees);

      this.employees = employees['employees'] as [];
    });
  }

  submit() {
    this.submitted = true;
    if (this.form.invalid) {
      this.toastr.warning('Please select/provide value for every field');
      return; //if form in-valid terminate operation
    }
          let req = this.form.value;
            this.addVehicle(req);
  }

  addVehicle(req) {
    this.vehiclesServices.store(req).subscribe(
      (res) => {
        console.log(res);
        this.listComponent.next(res);
        this.resetForm();
        this.toastr.success('Vehicle Registered');
      },
      (err) => {
        console.log(err);
        this.toastr.error(err);
      }
    );
  }

  toggleAllocation(allow) {
    this.validator.employees.setValidators(allow ? Validators.required : null);
    if (!allow) {
      this.resetAllocations();
    }
  }

  resetForm() {
    this.form.reset();
    this.submitted = false;
  }

  resetAllocations() {
    this.form.patchValue({
      employees: '',
    });
  }

  demo() {
    function randomValue(array) {
      return array[Math.floor(Math.random() * array.length)]
    }
    const today = new Date();

    this.form.patchValue({
      vehicleNumber: `RN-${Math.floor(Math.random() * 200) + 1}`,
      vehicleType: randomValue(['Car', 'Van', 'Motorcycle']),
      vehicleChaseNumber: `RAN-CHASE- ${Math.floor(Math.random() * 200) + 1}`,
      vehicleEngineNumber: `RAN-CHASE- ${Math.floor(Math.random() * 200) + 1}`,
      manufactureDate: `${today.getFullYear()}/${today.getMonth()}/${today.getDate()}`,
      vehicleColor: randomValue(['Green', 'Black', 'Pink']),
      vehiclePurchaseDate: `${today.getFullYear()}/${today.getMonth()}/${today.getDate()}`,
      vehicleOpenMileage: `${Math.floor(Math.random() * 200) + 1}`,
      insuranceType: randomValue(['Full option', '3rd party']),
      vehicleRegisteredDistrict: randomValue(['Colombo', 'Kandy']),
      nextLicenseRenewalDate: `${today.getFullYear()}/${today.getMonth()}/${today.getDate()}`,
      vehiclePreviousOwner: randomValue(['Elon Musk', 'Stark']),
      NIC: `${Math.floor(Math.random() * 965856225) + 1}`,
      contactNumber: `${Math.floor(Math.random() * 58964523) + 1}`,
      address: randomValue(['Malabe', 'Kaduwela', 'Kandy']),
      // employees: randomValue(this.employee)._id,
    });
  }

}
