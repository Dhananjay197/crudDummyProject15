import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './signup/signup.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { authGuard } from './service/auth.guard';
import { DynamicFormComponent } from './dynamic-form/dynamic-form.component';
import { DynamicRowFormComponent } from './dynamic-row-form/dynamic-row-form.component';


const routes: Routes = [
  {path:'',redirectTo:'login',pathMatch: 'full'},
  {path:'login',component:LoginComponent},
  {path:'signup',component:SignupComponent,},
  {path:'dashboard',component:DashboardComponent,canActivate: [authGuard] },
{path:'dynamicForm',component:DynamicFormComponent},
{path:'dynamicRowForm',component:DynamicRowFormComponent}


];

@NgModule({
  imports: [RouterModule.forRoot(routes,{ useHash: true }),],
  exports: [RouterModule],
})
export class AppRoutingModule { }
