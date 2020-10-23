import { Component, OnDestroy, OnInit } from '@angular/core';
import { Vehicles } from 'models/vehicles.model';
import { Subscription } from 'rxjs';
import { VehiclesServices } from 'service/vehicle.service';
import html2canvas from 'html2canvas';
import * as jsPDF from 'jspdf';

@Component({
  selector: 'app-vehicle-report',
  templateUrl: './vehicle-report.component.html',
  styleUrls: ['./vehicle-report.component.css']
})
export class VehicleReportComponent implements OnInit, OnDestroy {
  vehicleDetails: Vehicles[] = [];
  subscription: Subscription;

  constructor(private vehicleService: VehiclesServices) { }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }


  ngOnInit(): void {
    this.vehicleDetails = this.vehicleService.getVehicles();
    this.subscription = this.vehicleService.vehicleChanged.subscribe(
      (vehicles: Vehicles[]) => {
        this.vehicleDetails = vehicles;
      }
    );

  }

  generateReport(){
    setTimeout(() => {
      html2canvas(document.getElementById("tbl")).then(function (canvas) {
        var img = canvas.toDataURL("image/png");
        var doc = new jsPDF.jsPDF();
        var imgHeight = canvas.height * 210 / canvas.width;
        doc.text("Vehicle Report", 15, 15);
        doc.addImage(img, 0, 20, 210, imgHeight);
        doc.save('vehicleReport.pdf');
      });
    }, 1500)

  }

}
