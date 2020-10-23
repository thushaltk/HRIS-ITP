import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { LoginEmpComponent } from './login/login-emp/login-emp.component';
import { LoginAdminComponent } from './login/login-admin/login-admin.component';
import { AdminProfileComponent } from './admin-profile/admin-profile.component';
import { AnnouncementsComponent } from './admin-profile/announcements/announcements.component';
import { AdminDashboardComponent } from './admin-profile/admin-dashboard/admin-dashboard.component';
import { AdminAnnouncementsComponent } from './admin-profile/announcements/admin-announcements/admin-announcements.component';
import { AnnouncementCreateComponent } from './admin-profile/announcements/announcement-create/announcement-create.component';
import { ProjectsComponent } from './admin-profile/projects/projects.component';
import { EquipmentsComponent } from './admin-profile/equipments/equipments.component';
import { TrainingProgramsComponent } from './admin-profile/training-programs/training-programs.component';
import { VehiclesComponent } from './admin-profile/vehicles/vehicles.component';
import { EmployeesComponent } from './admin-profile/employees/employees.component';
import { EmpRegComponent } from './admin-profile/employees/emp-reg/emp-reg.component';
import { EmpRegistryComponent } from './admin-profile/employees/emp-registry/emp-registry.component';
import { EmpSelectComponent } from './admin-profile/employees/emp-select/emp-select.component';
import { EmpProfileComponent } from './emp-profile/emp-profile.component';
import { EmpDashboardComponent } from './emp-profile/emp-dashboard/emp-dashboard.component';
import { EquipmentListComponent } from './admin-profile/equipments/equipment-list/equipment-list.component';
import { NewEquipmentComponent } from './admin-profile/equipments/new-equipment/new-equipment.component';
import { NewProjectComponent } from './admin-profile/projects/new-project/new-project.component';
import { AttendanceComponent } from './admin-profile/attendance/attendance.component';
import { EmpAttendanceLeaveComponent } from './emp-profile/emp-attendance-leave/emp-attendance-leave.component';
import { EmpQuickLeaveComponent } from './emp-profile/emp-attendance-leave/emp-quick-leave/emp-quick-leave.component';
import { AddAttendanceComponent } from './admin-profile/attendance/add-attendance/add-attendance.component';

import { PayrollComponent } from './admin-profile/payroll/payroll.component';
import { AddVehicleComponent } from './admin-profile/vehicles/add-vehicle/add-vehicle.component';
import { AddPayrollComponent } from './admin-profile/payroll/add-payroll/add-payroll.component';
import { UpdatePayrollComponent } from './admin-profile/payroll/update-payroll/update-payroll.component';
import { TrainingAddComponent } from './admin-profile/training-programs/training-add/training-add.component';
import { EmpLongLeaveComponent } from './emp-profile/emp-attendance-leave/emp-long-leave/emp-long-leave.component';
import { ViewLeavesComponent } from './admin-profile/attendance/view-leaves/view-leaves.component';
import { VehicleListComponent } from './admin-profile/vehicles/vehicle-list/vehicle-list.component';
import { VehicleListAllComponent } from './admin-profile/vehicles/vehicle-list-all/vehicle-list-all.component';
import { VehicleAllocatedComponent } from './admin-profile/vehicles/vehicle-allocated/vehicle-allocated.component';
import { VehicleUnallocatedComponent } from './admin-profile/vehicles/vehicle-unallocated/vehicle-unallocated.component';
import { TrainingViewComponent } from './admin-profile/training-programs/training-view/training-view.component';
import { RegisterEmpComponent } from './login/login-emp/register-emp/register-emp.component';
import { SalaryListComponent } from './admin-profile/payroll/salary-list/salary-list.component';
import { AddSalaryComponent } from './admin-profile/payroll/add-salary/add-salary.component';
import { EmpPayrollComponent } from './emp-profile/emp-payroll/emp-payroll.component';
import { AdvancePaymentComponent } from './emp-profile/emp-payroll/advance-payment/advance-payment.component';
import { AddAdvancePaymentComponent } from './emp-profile/emp-payroll/add-advance-payment/add-advance-payment.component';
import { AdminAdvancePaymentComponent } from './admin-profile/payroll/admin-advance-payment/admin-advance-payment.component';
import { AnnouncementReportComponent } from './admin-profile/announcements/announcement-report/announcement-report.component';
import { SalaryReportComponent } from './admin-profile/payroll/salary-report/salary-report.component';

const appRoutes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: LandingPageComponent },
  { path: 'login/emp', component: LoginEmpComponent },
  { path: 'login/admin', component: LoginAdminComponent },
  { path: 'login/registerLogin', component: RegisterEmpComponent },
  {
    path: 'admin',
    component: AdminProfileComponent,
    children: [
      { path: 'dashboard', component: AdminDashboardComponent },
      {
        path: 'announcements',
        component: AnnouncementsComponent,
        children: [
          { path: 'view', component: AdminAnnouncementsComponent },
          { path: 'new', component: AnnouncementCreateComponent },
          { path: 'edit/:annID', component: AnnouncementCreateComponent },
          { path: 'report', component: AnnouncementReportComponent },
        ],
      },
      {
        path: 'trainingPrograms',
        component: TrainingProgramsComponent,
        children: [
          { path: 'add', component: TrainingAddComponent },
          { path: 'view', component: TrainingViewComponent },
          { path: 'edit/:trpID', component: TrainingAddComponent },
          { path: 'report', component: TrainingProgramReportComponent },
        ],
      },
      { path: 'projects', component: ProjectsComponent },
      { path: 'projects/new', component: NewProjectComponent },

      { path: 'payroll', component: PayrollComponent },
      { path: 'payroll/addPayroll', component: AddPayrollComponent },
      { path: 'payroll/updatePayroll', component: UpdatePayrollComponent },

      {
        path: 'payroll/advancePayment',
        component: AdminAdvancePaymentComponent,
      },

      { path: 'salaryList', component: SalaryListComponent },
      { path: 'salaryList/addSalary', component: AddSalaryComponent },
      { path: 'salaryReport', component: SalaryReportComponent },

      {
        path: 'equipments',
        component: EquipmentsComponent,
        children: [
          { path: 'list', component: EquipmentListComponent },
          { path: 'new', component: NewEquipmentComponent },
        ],
      },
      {
        path: 'vehicles',
        component: VehiclesComponent,
        children: [
          { path: 'new', component: AddVehicleComponent },
          {
            path: 'view',
            component: VehicleListComponent,
            children: [
              { path: 'all', component: VehicleListAllComponent },
              { path: 'allocated', component: VehicleAllocatedComponent },
              { path: 'unallocated', component: VehicleUnallocatedComponent },
            ],
          },
        ],
      },
      {
        path: 'employees',
        component: EmployeesComponent,
        children: [
          { path: 'create', component: EmpRegComponent },
          { path: 'view', component: EmpSelectComponent },
          { path: ':designation', component: EmpRegistryComponent },
        ],
      },

      { path: 'attendance', component: AttendanceComponent },

      { path: 'attendance/add-attendance', component: AddAttendanceComponent },

      { path: 'attendance/view-leaves', component: ViewLeavesComponent },
    ],
  },

  {
    path: 'empProfile',
    component: EmpProfileComponent,
    children: [
      {
        path: ':nic',
        component: EmpProfileComponent,
        children: [
          { path: 'dashboard', component: EmpDashboardComponent },
          { path: 'payroll', component: EmpPayrollComponent },
          { path: 'advancePayment', component: AdvancePaymentComponent },
          { path: 'advancePayment/add', component: AddAdvancePaymentComponent },
          { path: 'dashboard/:nic', component: EmpDashboardComponent },
          {
            path: 'attendanceLeave',
            component: EmpAttendanceLeaveComponent,
            children: [
              { path: 'quickLeave/:nic', component: EmpQuickLeaveComponent },
              { path: 'longLeave/:nic', component: EmpLongLeaveComponent },
            ],
          },
        ],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
