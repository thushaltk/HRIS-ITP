import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { AppComponent } from './app.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { AppRoutingModule } from './app-routing.module';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { LoginComponent } from './login/login.component';
import { LoginEmpComponent } from './login/login-emp/login-emp.component';
import { LoginAdminComponent } from './login/login-admin/login-admin.component';
import { AdminProfileComponent } from './admin-profile/admin-profile.component';
import { AdminDashboardComponent } from './admin-profile/admin-dashboard/admin-dashboard.component';
import { AnnouncementsComponent } from './admin-profile/announcements/announcements.component';
import { AdminAnnouncementsComponent } from './admin-profile/announcements/admin-announcements/admin-announcements.component';
import { AnnouncementCreateComponent } from './admin-profile/announcements/announcement-create/announcement-create.component';
import { TrainingProgramsComponent } from './admin-profile/training-programs/training-programs.component';
import { ProjectsComponent } from './admin-profile/projects/projects.component';
import { EquipmentsComponent } from './admin-profile/equipments/equipments.component';
import { VehiclesComponent } from './admin-profile/vehicles/vehicles.component';
import { EmployeesComponent } from './admin-profile/employees/employees.component';
import { EmpRegComponent } from './admin-profile/employees/emp-reg/emp-reg.component';
import { EmpRegistryComponent } from './admin-profile/employees/emp-registry/emp-registry.component';
import { EmpSelectComponent } from './admin-profile/employees/emp-select/emp-select.component';
import { EmpUpdateComponent } from './admin-profile/employees/emp-update/emp-update.component';
import { PayrollComponent } from './admin-profile/payroll/payroll.component';
import { AnnouncementService } from 'service/announcements.service';
import { EmployeeService } from 'service/employees.service';
import { EmpProfileComponent } from './emp-profile/emp-profile.component';
import { EmpDashboardComponent } from './emp-profile/emp-dashboard/emp-dashboard.component';
import { EmpAnnouncementsComponent } from './emp-profile/emp-announcements/emp-announcements.component';
import { EmpEmployeesComponent } from './emp-profile/emp-employees/emp-employees.component';
import { EmpEquipementsComponent } from './emp-profile/emp-equipements/emp-equipements.component';
import { EmpPayrollComponent } from './emp-profile/emp-payroll/emp-payroll.component';
import { EmpProjectsComponent } from './emp-profile/emp-projects/emp-projects.component';
import { EmpTrainingProgramsComponent } from './emp-profile/emp-training-programs/emp-training-programs.component';
import { EmpVehiclesComponent } from './emp-profile/emp-vehicles/emp-vehicles.component';
import { AttendanceComponent } from './admin-profile/attendance/attendance.component';
import { PayrollListComponent } from './admin-profile/payroll/payroll-list/payroll-list.component';

import { EquipmentListComponent } from './admin-profile/equipments/equipment-list/equipment-list.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { NewEquipmentComponent } from './admin-profile/equipments/new-equipment/new-equipment.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ConfirmDialogComponent } from './shared/confirm-dialog/confirm-dialog.component';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ToastrModule } from 'ngx-toastr';
import { MatSelectModule } from '@angular/material/select';
import { NewProjectComponent } from './admin-profile/projects/new-project/new-project.component';
import { DatePipe } from '@angular/common';
import { EmpAttendanceLeaveComponent } from './emp-profile/emp-attendance-leave/emp-attendance-leave.component';
import { EmpQuickLeaveComponent } from './emp-profile/emp-attendance-leave/emp-quick-leave/emp-quick-leave.component';
import { QuickLeavesService } from '../../service/quickLeaves.service';

@NgModule({
  declarations: [
    AppComponent,
    LandingPageComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    LoginEmpComponent,
    LoginAdminComponent,
    AdminProfileComponent,
    AdminDashboardComponent,
    AnnouncementsComponent,
    AdminAnnouncementsComponent,
    AnnouncementCreateComponent,
    TrainingProgramsComponent,
    ProjectsComponent,
    EquipmentsComponent,
    VehiclesComponent,
    EmployeesComponent,
    EmpRegComponent,
    EmpRegistryComponent,
    EmpSelectComponent,
    EmpUpdateComponent,
    PayrollComponent,
    EmpProfileComponent,
    EmpDashboardComponent,
    EmpAnnouncementsComponent,
    EmpEmployeesComponent,
    EmpEquipementsComponent,
    EmpPayrollComponent,
    EmpProjectsComponent,
    EmpTrainingProgramsComponent,
    EmpVehiclesComponent,
    AttendanceComponent,
    PayrollListComponent,

    EquipmentListComponent,
    NewEquipmentComponent,
    ConfirmDialogComponent,
    NewProjectComponent,
    EmpAttendanceLeaveComponent,
    EmpQuickLeaveComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,

    //material
    MatProgressSpinnerModule,
    MatTableModule,
    MatPaginatorModule,
    MatInputModule,
    MatDialogModule,
    MatRadioModule,
    MatCheckboxModule,
    MatSelectModule,

    //taostModule
    ToastrModule.forRoot(), // ToastrModule added
  ],
  providers: [
    AnnouncementService,
    EmployeeService,
    DatePipe,
    QuickLeavesService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
