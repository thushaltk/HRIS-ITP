import {
  Component,
  OnInit,
  ViewChild,
  TemplateRef,
  Output,
  EventEmitter,
  Input,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';

import { ConfirmService } from '../../../shared/confirm.service';
import { EquipmentService } from '../../../_services/equipment.service';
import { ToastrService } from 'ngx-toastr';
import { IEquipment } from '../../../_models/equipment.model';
import { IProject } from '../../../_models/project.model';
import { ProjectsService } from '../../../_services/projects.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-new-equipment',
  templateUrl: './new-equipment.component.html',
  styleUrls: ['./new-equipment.component.css'],
})
export class NewEquipmentComponent implements OnInit {
  form: FormGroup;
  submitted: boolean = false;
  @Output() listComponent = new EventEmitter<any>();
  @Output() update = new EventEmitter<any>();
  @Input() isUpdate: boolean = false;
  @Input() equipment: IEquipment;
  projects: IProject[] = []
  constructor(
    private fb: FormBuilder,
    private confirmService: ConfirmService,
    private equipmentService: EquipmentService,
    private toastr: ToastrService,
    private projectService: ProjectsService,
    private datePipe: DatePipe,
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      _id: '',
      eid: new FormControl('', Validators.required),
      name: new FormControl('', Validators.required),
      category: new FormControl('Tool', Validators.required),
      type: new FormControl('Out Source', Validators.required),
      allocation: false,
      project: new FormControl(null),
      startDate: new FormControl(''),
      duration: new FormControl(''),
      person: new FormControl(''),
      remarks: new FormControl(''),
    });

    this.getProjects();
    if (this.equipment) {
      this.equipment.project = this.equipment.project?._id
      this.form.patchValue(this.equipment);
      this.form.patchValue({
        startDate: this.datePipe.transform(this.equipment.startDate, "yyyy-MM-dd")
      })
      this.isUpdate = true;
    } else {
      this.isUpdate = false;
    }

    this.form.controls.allocation.valueChanges.subscribe((value) => {
      this.toggleAllocation(value);
    });
  }

  get validator() {
    return this.form.controls;
  }

  submit() {
    this.submitted = true;
    if (this.form.invalid) {
      this.toastr.warning('Please select/provide value for every field');
      return; //if form in-valid terminate operation
    }
    this.confirmService
      .confirm(
        `${this.isUpdate ? 'Update Equipment ? ' : 'Register a new equipment ?'
        }`
      )
      .then(
        (confirm) => {
          let req = this.form.value;
          if (this.isUpdate) {
            this.updateEquipment(req);
          } else {
            this.addEquipment(req);
          }
        },
        (reject) => { }
      );
  }

  addEquipment(req) {
    this.equipmentService.store(req).subscribe(
      (res) => {
        console.log(res);
        this.listComponent.next(res);
        this.resetForm();
        this.toastr.success('Equipment Registered');
      },
      (err) => {
        console.log(err);
        this.toastr.error('Error');
      }
    );
  }

  updateEquipment(req) {
    this.equipmentService.update(req).subscribe(
      (res) => {
        console.log(res);
        this.resetForm();
        this.update.next(res['equipment']);
        this.toastr.success('Equipment Updated');
      },
      (err) => {
        console.log(err);
        this.toastr.error('Error');
      }
    );
  }

  toggleAllocation(allow) {
    this.validator.project.setValidators(allow ? Validators.required : null);
    this.validator.startDate.setValidators(allow ? Validators.required : null);
    this.validator.duration.setValidators(allow ? Validators.required : null);
    this.validator.person.setValidators(allow ? Validators.required : null);
    this.validator.remarks.setValidators(allow ? Validators.required : null);
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
      project: '',
      duration: '',
      startDate: '',
      person: '',
      remarks: '',
    });
  }

  getProjects() {
    this.projectService.getProjects().subscribe(
      (res) => {
        this.projects = res as [];
      },
      (err) => {
        this.toastr.error(`${err}`);
      }
    );
  }

  demo() {
    function randomValue(array) {
      return array[Math.floor(Math.random() * array.length)]
    }
    const eqName = ['Drill', 'Cement Mixer', 'Electric Socket', 'Glue Gun']
    const today = new  Date();
    this.form.patchValue({
      eid: `EQ0000${Math.floor(Math.random() * 200) + 1}`,
      name: randomValue(eqName) + '-' + Math.floor(Math.random() * 20) + 1,
      category: randomValue(['Tool', 'Vehicle']),
      type: randomValue(['Inside', 'Out Source']),
      allocation: true,
      project: randomValue(this.projects)._id,
      startDate: `${today.getFullYear()}/${today.getMonth()}/${today.getDate()}`,
      duration: "2 Years",
      person: 'Mr.Bruce Wayne',
      remarks: "No Refund ",
    })
  }
}
