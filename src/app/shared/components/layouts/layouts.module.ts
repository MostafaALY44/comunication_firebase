import { NgModule } from '@angular/core';
import {RouterModule} from '@angular/router'
import { CommonModule } from '@angular/common';

import { UserComponent } from './user/user.component';
import { SuperAdminComponent } from './super-admin/super-admin.component';
import { AuthComponent } from './auth/auth.component';
import { WelcomeComponent } from './welcome/welcome.component';



@NgModule({
  declarations: [
    UserComponent, 
    SuperAdminComponent, 
    AuthComponent, 
    WelcomeComponent, 
  ],
  
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class LayoutsModule { }
