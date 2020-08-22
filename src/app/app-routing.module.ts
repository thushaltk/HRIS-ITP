import { NgModule } from '@angular/core';
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


const appRoutes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full'},
  { path: 'home', component: LandingPageComponent},
  { path: 'login/emp', component: LoginEmpComponent},
  { path: 'login/admin', component: LoginAdminComponent},
  { path: 'admin', component: AdminProfileComponent, children: [
    { path: 'dashboard', component: AdminDashboardComponent},
    { path: 'announcements', component: AnnouncementsComponent, children: [
      { path: 'view', component: AdminAnnouncementsComponent},
      { path: 'new', component: AnnouncementCreateComponent}
    ]},
    { path: 'projects', component: ProjectsComponent},
    { path: 'equipments', component: EquipmentsComponent},
    { path: 'training-programs', component: TrainingProgramsComponent},
    { path: 'vehicles', component: VehiclesComponent},
    { path: 'employees', component: EmployeesComponent, children: [
      { path: 'create', component: EmpRegComponent}
    ]}

  ]}
]



@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }


