import {
  Component,
  OnInit,
  ViewChild,
  TemplateRef,

} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { VehiclesServices } from '../../../_services/vehicle.service';
import { Vehicle } from '../../../_models/vehicle.model';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ConfirmService } from '../../../shared/confirm.service';
import { FormControl } from '@angular/forms';
import { SelectionModel } from '@angular/cdk/collections';
 
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-vehicle-list',
  templateUrl: './vehicle-list.component.html',
  styleUrls: ['./vehicle-list.component.css']
})
export class VehicleListComponent implements OnInit {
  displayedColumns: string[] = [
    'select',
    'vehicleNumber',
    'vehicleType',
    'vehicleChaseNumber',
    'vehicleEngineNumber',
    'manufactureDate',
    'vehicleColor',
    'vehiclePurchaseDate',
    'vehicleOpenMileage',
    'insuranceType',
    'vehicleRegisteredDistrict',
    'nextLicenseRenewalDate',
    'vehiclePreviousOwner',
    'NIC',
    'contactNumber',
    'address',
    'employees',
  ];
  columns: string[] = [
    'select',
    'vehicleNumber',
    'vehicleType',
    'vehicleChaseNumber',
    'vehicleEngineNumber',
    'manufactureDate',
    'vehicleColor',
    'vehiclePurchaseDate',
    'vehicleOpenMileage',
    'insuranceType',
    'vehicleRegisteredDistrict',
    'nextLicenseRenewalDate',
    'vehiclePreviousOwner',
    'NIC',
    'contactNumber',
    'address',
    'employees',
  ];
  columnsFilter = new FormControl(this.columns);
  dataSource = new MatTableDataSource<Vehicle>();
  vehicles: Vehicle[] = [];
  vehicle: Vehicle;
  keyword: string = '';
  month: Date;
  loading: boolean = false;
  @ViewChild('callAPIDialog') callAPIDialog: TemplateRef<any>;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  selection = new SelectionModel<Vehicle>(true, []);
  constructor(
    private dialog: MatDialog,
    private datePipe: DatePipe,
    private toastr: ToastrService,
    private vehicleService: VehiclesServices,
    private confirmService: ConfirmService,
  ) { }

  ngOnInit(): void {
    this.getVehicle();

    this.columnsFilter.valueChanges.subscribe((values) => {
      console.log(values);
      this.displayedColumns = values;
    });
  }

  openModal() {
    let dialogRef = this.dialog.open(this.callAPIDialog);
    dialogRef.afterClosed().subscribe((result) => {
      this.vehicle = null;
    });
  }

  getVehicle() {
    this.loading = true;
    this.vehicleService.getVehicles().subscribe(
      (res) => {
        this.vehicles = res as [];
        this.dataSource = new MatTableDataSource<Vehicle>(this.vehicles);
        this.dataSource.paginator = this.paginator;
        this.loading = false;
      },
      (err) => {
        this.toastr.error(`${err}`);
        this.loading = false;
      }
    );
  }

  pushNewVehicle(event) {
    console.log(event);
    this.loading = true;
    this.vehicles.push(event);
    this.dataSource = new MatTableDataSource<Vehicle>(this.vehicles);
    this.dataSource.paginator = this.paginator;
    this.closeModal();
    this.loading = false;
  }

  closeModal() {
    let dialogRef = this.dialog.closeAll();
  }

  setUpdate() {
    if (this.selection.selected.length == 0) {
      this.toastr.info('Please select a value')
      return;
    }
    console.log();
    if (this.selection.selected.length > 1) {
      this.toastr.info("You can not update multiple data.please select only one")
    } else {
      this.openModal();
      this.vehicle = this.selection.selected[0];
    }
  }

  updateVehicle(event) {
    console.log(event);
    this.loading = true
    this.closeModal();
    let index = this.vehicles.findIndex(
      (element) => element._id == event._id
    );
    console.log(index);
    if (index > -1) {
      this.vehicles[index] = event;
      this.dataSource = new MatTableDataSource<Vehicle>(this.vehicles);
      this.dataSource.paginator = this.paginator;
      this.loading = false;
    } else {
      this.loading = false;
      this.toastr.error(
        'Error Occurred while trying to update the table.please refresh to see updated results'
      );
    }
  }

  deleteVehicle() {
    if (this.selection.selected.length == 0) {
      this.toastr.info('Please select a value')
      return;
    }
    this.confirmService
      .confirm(
        `Are you sure to delete Vehicle(s) ? this cannot be undone`
      )
      .then(
        (confirm) => {
          this.loading = true;
          let vehicles = this.selection.selected.map(el => el._id);
          this.vehicleService.delete(vehicles).subscribe(
            (res) => {
              // console.log(res);

              if (res) {
                this.toastr.success(`Vehicle(s) removed`);
                this.vehicles = this.vehicles.filter(
                  (element) => !vehicles.includes(element._id)
                ); //remove deleted item
                this.selection.clear()
                this.dataSource = new MatTableDataSource<Vehicle>(
                  this.vehicles
                );
                this.dataSource.paginator = this.paginator;
              } else {

                this.toastr.error('Can not find the vehicle');
              }
              this.loading = false;
            },
            (err) => {
              console.log(err);
              this.loading = false;
              this.toastr.error(
                'Error Ocurred while trying to delete the vehicle'
              );
            }
          );
        },
        (reject) => { }
      );
  }

  filter(event) {
    this.keyword = '';
    let vehicles = [...this.vehicles];
    if (event == 0) {
      vehicles = vehicles.filter(
        (el) => el.allocation == false || el.allocation == null
      );
    } else if (event == 1) {
      vehicles = vehicles.filter((el) => el.allocation == true);
    }
    this.dataSource = new MatTableDataSource<Vehicle>(vehicles);
    this.dataSource.paginator = this.paginator;
  }

  

  search(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }

  checkboxLabel(row?: any): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }

  // to report
  report() {
    let data = this.vehicles.map((item) => {
      let allo;
      if(item.allocation == false){
           allo = "Not Allocated" 
      }else{
         allo = "Allocated"
      }
      return [
        item.vehicleNumber,
        item.vehicleType,
        item.insuranceType,
        item.vehicleRegisteredDistrict,
        item.nextLicenseRenewalDate,
        allo,
      ];
    });
    let doc = new jsPDF('l', 'mm', [305, 250]);
    doc.text('UK Engineering Services (PVT) Ltd', 35, 10);
    doc.text(
      `Vehicle Report  ${this.datePipe.transform(
        new Date(),
        'yyyy-MM-dd HH:mm'
      )}`,
      35,
      20
    );

    let img = new Image();
    img.src = 'assets/images/logo.png';
    doc.addImage(img, 10, 5, 20, 20);

    autoTable(doc, {
      head: [
        [
          'Number',
          'Type',
          'Insurance Type',
          'Registed District',
          'Licence Renuewal Date',
          'Allocated',
        ],
      ],
      body: data,
      margin: { top: 40 },
    });

    doc.save(
      `Vehicle Report - ${this.datePipe.transform(
        new Date(),
        'yyyy-MM-dd HH:mm'
      )}`
    );
  }
}





