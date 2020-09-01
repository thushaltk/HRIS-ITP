import {
  Component,
  OnInit,
  ViewChild,
  TemplateRef,
  ElementRef,
} from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { EquipmentService } from '../../../_services/equipment.service';
import { IEquipment } from '../../../_models/equipment.model';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { NewEquipmentComponent } from '../new-equipment/new-equipment.component';
import { ConfirmService } from '../../../shared/confirm.service';
import { FormControl } from '@angular/forms';
import { timestamp } from 'rxjs/operators';
@Component({
  selector: 'app-equipment-list',
  templateUrl: './equipment-list.component.html',
  styleUrls: ['./equipment-list.component.css'],
})
export class EquipmentListComponent implements OnInit {
  displayedColumns: string[] = [
    'eid',
    'name',
    'category',
    'type',
    'project',
    'startDate',
    'duration',
    'person',
    'remarks',
    'action',
  ];
  columns: string[] = [
    'eid',
    'name',
    'category',
    'type',
    'project',
    'startDate',
    'duration',
    'person',
    'remarks',
    'action',
  ];
  columnsFilter = new FormControl(this.columns);
  dataSource = new MatTableDataSource<IEquipment>();
  equipments: IEquipment[] = [];
  equipment: IEquipment;
  keyword: string = '';
  loading: boolean = false;
  @ViewChild('callAPIDialog') callAPIDialog: TemplateRef<any>;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    private router: Router,
    private dialog: MatDialog,
    private toastr: ToastrService,
    private equipmentService: EquipmentService,
    private confirmService: ConfirmService
  ) {}

  ngOnInit(): void {
    this.getEquipments();

    this.columnsFilter.valueChanges.subscribe((values) => {
      console.log(values);
      this.displayedColumns = values;
    });
  }

  openModal() {
    let dialogRef = this.dialog.open(this.callAPIDialog);
    dialogRef.afterClosed().subscribe((result) => {
      this.equipment = null;
    });
  }

  getEquipments() {
    this.loading = true;
    this.equipmentService.getEquipments().subscribe(
      (res) => {
        this.equipments = res as [];
        this.dataSource = new MatTableDataSource<IEquipment>(this.equipments);
        this.dataSource.paginator = this.paginator;
        this.loading = false;
      },
      (err) => {
        this.toastr.error(`${err}`);
        this.loading = false;
      }
    );
  }

  pushNewEquipment(event) {
    console.log(event);
    this.loading = true;
    this.equipments.push(event);
    this.dataSource = new MatTableDataSource<IEquipment>(this.equipments);
    this.dataSource.paginator = this.paginator;
    this.closeModal();
    this.loading = false;
  }

  closeModal() {
    let dialogRef = this.dialog.closeAll();
  }

  setUpdate(equipment) {
    this.openModal();
    this.equipment = equipment;
  }

  updateEquipment(event) {
    console.log(event);
    this.loading = true
    this.closeModal();
    let index = this.equipments.findIndex(
      (element) => element._id == event._id
    );
    console.log(index);
    if (index > -1) {
      this.equipments[index] = event;
      this.dataSource = new MatTableDataSource<IEquipment>(this.equipments);
      this.dataSource.paginator = this.paginator;
      this.loading = false;
    } else {
      this.loading = false;
      this.toastr.error(
        'Error Occurred while trying to update the table.please refresh to see updated results'
      );
    }
  }

  deleteEquipment(equipment) {
    this.confirmService
      .confirm(
        `Are you sure to delete ${equipment.name} ? this cannot be undone`
      )
      .then(
        (confirm) => {
          this.loading = true;
          this.equipmentService.delete(equipment).subscribe(
            (res) => {
              console.log(res);

              if (res) {
                this.toastr.success(`Equipment, ${equipment.name} removed`);
                this.equipments = this.equipments.filter(
                  (element) => element._id != equipment._id
                ); //remove deleted item
                this.dataSource = new MatTableDataSource<IEquipment>(
                  this.equipments
                );
                this.dataSource.paginator = this.paginator;
              } else {
                
                this.toastr.error('Can not find the equipment');
              }
              this.loading = false;
            },
            (err) => {
              console.log(err);
              this.loading = false;
              this.toastr.error(
                'Error Ocurred while trying to delete the equipment'
              );
            }
          );
        },
        (reject) => {}
      );
  }

  filter(event) {
    this.keyword = '';
    let equipments = [...this.equipments];
    if (event == 0) {
      equipments = equipments.filter(
        (el) => el.allocation == false || el.allocation == null
      );
    } else if (event == 1) {
      equipments = equipments.filter((el) => el.allocation == true);
    }
    this.dataSource = new MatTableDataSource<IEquipment>(equipments);
    this.dataSource.paginator = this.paginator;
  }

  search(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
