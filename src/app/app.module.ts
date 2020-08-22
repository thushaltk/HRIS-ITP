import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

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
    EmpUpdateComponent


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
