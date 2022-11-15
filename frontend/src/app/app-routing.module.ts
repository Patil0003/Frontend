import { NgModule } from '@angular/core';
import { RouterModule, Routes, CanActivate } from '@angular/router';
import { LoginComponent } from './user/login/login.component';
import { RegisterComponent } from './user/register/register.component';
import { DashboardComponent } from './user/dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';
import { AuthguardGuard } from './services/authguard.guard';
import { MyprofileComponent } from './user/myprofile/myprofile.component';
const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [AuthguardGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {path: 'dashboard', component: DashboardComponent,canActivate: [AuthguardGuard]},
  { path: 'myprofile', component: MyprofileComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
