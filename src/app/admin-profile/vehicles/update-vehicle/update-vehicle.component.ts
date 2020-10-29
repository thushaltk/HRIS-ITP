import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { VehiclesServices } from 'src/app/_services/vehicle.service';
import { ConfirmService } from '../../../shared/confirm.service';
import { ToastrService } from 'ngx-toastr';
import { Vehicle } from '../../../_models/vehicle.model';
import { Employees } from 'models/employees.model';

@Component({
  selector: 'app-update-vehicle',
  templateUrl: './update-vehicle.component.html',
  styleUrls: ['./update-vehicle.component.css']
})
export class UpdateVehicleComponent implements OnInit {
  form: FormGroup;
  submitted: boolean = false;
  @Output() listComponent = new EventEmitter<any>();
  @Output() update = new EventEmitter<any>();
  @Input() isUpdate: boolean = false;
  @Input() vehicle: Vehicle;
  @Input() employee: Employees;
  employees: any[] = [];
  vehicles: any[] = [];
  newVehicle:any
  constructor(
    private fb: FormBuilder,
    private confirmService: ConfirmService,
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
      employees: new FormControl(null),
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

      let _id = this.form.value._id;
      let vehicleNumber = this.form.value.vehicleNumber;
      let vehicleType = this.form.value.vehicleType;
      let vehicleChaseNumber = this.form.value.vehicleChaseNumber;
      let vehicleEngineNumber = this.form.value.vehicleEngineNumber;
      let manufactureDate = this.form.value.manufactureDate;
      let vehicleColor = this.form.value.vehicleColor;
      let vehiclePurchaseDate = this.form.value.vehiclePurchaseDate;
      let vehicleOpenMileage = this.form.value.vehicleOpenMileage;
      let insuranceType = this.form.value.insuranceType;
      let vehicleRegisteredDistrict = this.form.value.vehicleRegisteredDistrict;
      let nextLicenseRenewalDate = this.form.value.nextLicenseRenewalDate;
      let vehiclePreviousOwner = this.form.value.vehiclePreviousOwner;
      let NIC = this.form.value.NIC;
      let contactNumber = this.form.value.contactNumber;
      let address = this.form.value.address;
      let employee = this.form.value.employees;
      let allocation = this.form.value.allocation;

      this.newVehicle = {_id, vehicleNumber, vehicleType, vehicleChaseNumber, vehicleEngineNumber,
        manufactureDate, vehicleColor, vehiclePurchaseDate, vehicleOpenMileage, 
        insuranceType, vehicleRegisteredDistrict, nextLicenseRenewalDate,
        vehiclePreviousOwner, NIC, contactNumber, address, allocation, employee}
        console.log(this.form.value.employees);
        
      this.updateVehicle(this.newVehicle);   
  }

  toggleAllocation(allow) {
    this.validator.employees.setValidators(allow ? Validators.required : null);
    if (!allow) {
      this.resetAllocations();
    }
  }

  updateVehicle(req) {
    this.vehiclesServices.update(req).subscribe(
      (res) => {
        console.log(res);
        this.resetForm();
        this.update.next(res['vehicle']);
        this.toastr.success('Vehicle Updated');
      },
      (err) => {
        console.log(err);
        this.toastr.error('Error');
      }
    );

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
      vehicleNumber: `RAN-${Math.floor(Math.random() * 200) + 1}`,
      vehicleType: randomValue(['Car', 'Van', 'Motorcycle']),
      vehicleChaseNumber: `RAN-CHASE- ${Math.floor(Math.random() * 200) + 1}`,
      vehicleEngineNumber: `RAN-CHASE- ${Math.floor(Math.random() * 200) + 1}`,
      // manufactureDate: `${today.getFullYear()}/${today.getMonth()}/${today.getDate()}`,
      vehicleColor: randomValue(['Green', 'Black', 'Pink']),
      // vehiclePurchaseDate: `${today.getFullYear()}/${today.getMonth()}/${today.getDate()}`,
      vehicleOpenMileage: `${Math.floor(Math.random() * 200) + 1}`,
      insuranceType: randomValue(['Full option', '3rd party']),
      vehicleRegisteredDistrict: randomValue(['Colombo', 'Kandy']),
      // nextLicenseRenewalDate: `${today.getFullYear()}/${today.getMonth()}/${today.getDate()}`,
      vehiclePreviousOwner: "Elon Musk",
      NIC: "722863366V",
      contactNumber: "0776583269",
      address: "255/45, Kahanthota Road, Malabe",
      // employees: randomValue(this.employee)._id,
    });
  }



}
