import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { LoginEmpComponent } from './login/login-emp/login-emp.component';
import { LoginAdminComponent } from './login/login-admin/login-admin.component';
import { AdminProfileComponent } from './admin-profile/admin-profile.component';
import { AdminDashboardComponent } from './admin-profile/admin-dashboard/admin-dashboard.component';


const appRoutes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full'},
  { path: 'home', component: LandingPageComponent},
  { path: 'login/emp', component: LoginEmpComponent},
  { path: 'login/admin', component: LoginAdminComponent},
  { path: 'admin', component: AdminProfileComponent, children: [
    { path: 'dashboard', component: AdminDashboardComponent}
  ]}
]



@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }


