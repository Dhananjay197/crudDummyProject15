import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import { DialogDataExampleDialogComponent } from './dialog-data-example-dialog/dialog-data-example-dialog.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import {MatRadioModule} from '@angular/material/radio';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { authGuard } from './service/auth.guard';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { ConfirmDailogComponent } from './confirm-dailog/confirm-dailog.component';

import { SharedService } from './shared/shared.service';
import { Interceptor } from './interceptor/interceptor.interceptor';
import {MatStepperModule} from '@angular/material/stepper';
import {MatCardModule} from '@angular/material/card';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { IdleTimeoutServiceService } from './shared/idle-timeout-service.service';
import { DynamicFormComponent } from './dynamic-form/dynamic-form.component';
import { DynamicRowFormComponent } from './dynamic-row-form/dynamic-row-form.component';

@NgModule({
  declarations: [
    AppComponent,
    DialogDataExampleDialogComponent,
    LoginComponent,
    SignupComponent,
    DashboardComponent,
    ConfirmDailogComponent,
    DynamicFormComponent,
    DynamicRowFormComponent,
  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatRadioModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatCheckboxModule,
    MatStepperModule,
    MatCardModule,
   
    
  ],
  providers: [SharedService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: Interceptor,
      multi: true
  },
  {
    provide: STEPPER_GLOBAL_OPTIONS,
    useValue: {showError: true},
  },],
  bootstrap: [AppComponent]
})
export class AppModule { }
