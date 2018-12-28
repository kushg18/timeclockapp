import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProfileComponent } from './components/profile/profile.component';
import { AuthGuard } from './guards/auth.gaurd';
import { ManagementComponent } from './components/management/management.component';
import { RoleGuard } from './guards/role.gaurd';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'login', component: LoginComponent},
  {path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]},
  {path: 'profile', component: ProfileComponent, canActivate: [AuthGuard]},
  {path: 'management', component: ManagementComponent, canActivate: [AuthGuard, RoleGuard]}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  providers:[AuthGuard, RoleGuard],
  exports: [RouterModule]
})
export class AppRoutingModule { }
