import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';

import { ConfirmService } from '../../../shared/confirm.service';
import { EquipmentService } from '../../../_services/equipment.service';

@Component({
  selector: 'app-new-equipment',
  templateUrl: './new-equipment.component.html',
  styleUrls: ['./new-equipment.component.css'],
})
export class NewEquipmentComponent implements OnInit {
  form: FormGroup;
  submitted: boolean = false;
  constructor(
    private fb: FormBuilder,
    private confirmService: ConfirmService,
    private equipmentService: EquipmentService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      eid: new FormControl('', Validators.required),
      name: new FormControl('', Validators.required),
      category: new FormControl('Tool', Validators.required),
      type: new FormControl('Out Source', Validators.required),
    });
  }

  get validator() {
    return this.form.controls;
  }

  submit() {
    this.submitted = true;
    if (this.form.invalid) {
      return; //if form in-valid terminate operation
    }
    this.confirmService.confirm('Register and new equipment').then(
      (confirm) => {
        let req = this.form.value;
        this.addEquipment(req);
      },
      (reject) => {}
    );
  }

  addEquipment(req) {
    this.equipmentService.store(req).subscribe(res=>{
      console.log(res);
      
    },err=>{
      console.log(err);
      
    })
  }
}
