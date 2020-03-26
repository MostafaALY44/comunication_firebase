import { NgModule } from '@angular/core';
import {RouterModule} from '@angular/router'
import { CommonModule } from '@angular/common';

import { UserComponent } from './user/user.component';
import { SuperAdminComponent } from './super-admin/super-admin.component';
import { AuthComponent } from './auth/auth.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { NavComponent } from './announcement-nave/nav/nav.component';
import { MaterialModule } from 'src/app/material.module';
import { FormsModule } from '@angular/forms';
import { AnnouncementNaveComponent } from './announcement-nave/announcement-nave.component';
import { FooterComponent } from './footer.component';

@NgModule({
  declarations: [
    UserComponent, 
    SuperAdminComponent, 
    AuthComponent, 
    WelcomeComponent, 
    NavComponent,
    AnnouncementNaveComponent,
    FooterComponent
  ],
  
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule,
    FormsModule
  ]
})
export class LayoutsModule { }
