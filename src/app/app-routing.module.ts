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

import { VehicleListComponent } from './admin-profile/vehicles/vehicle-list/vehicle-list.component';
import { AllListOfVehicleComponent } from './admin-profile/vehicles/all-list-of-vehicle/all-list-of-vehicle.component';
import { AddNewVehicleComponent } from './admin-profile/vehicles/add-new-vehicle/add-new-vehicle.component';
import { AllocatedVehicleComponent } from './admin-profile/vehicles/allocated-vehicle/allocated-vehicle.component';
import { UnAllocatedVehicleComponent } from './admin-profile/vehicles/un-allocated-vehicle/un-allocated-vehicle.component';

const appRoutes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: LandingPageComponent },
  { path: 'login/emp', component: LoginEmpComponent },
  { path: 'login/admin', component: LoginAdminComponent },
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
        ],
      },
      { path: 'projects', component: ProjectsComponent },
      { path: 'projects/new', component: NewProjectComponent },
      {
        path: 'equipments',
        component: EquipmentsComponent,
        children: [
          { path: 'list', component: EquipmentListComponent },
          { path: 'new', component: NewEquipmentComponent },
        ],
      },
      { path: 'training-programs', component: TrainingProgramsComponent },
      {
        path: 'vehicles',
        component: VehiclesComponent,
        children: [
          { path: 'list', component: VehicleListComponent },
          { path: 'allList', component: AllListOfVehicleComponent },
          { path: 'addNew', component: AddNewVehicleComponent },
          { path: 'allocated', component: AllocatedVehicleComponent },
          { path: 'unAllocated', component: UnAllocatedVehicleComponent },
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
    ],
  },

  {
    path: 'empProfile',
    component: EmpProfileComponent,
    children: [{ path: ':nic', component: EmpProfileComponent }],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
