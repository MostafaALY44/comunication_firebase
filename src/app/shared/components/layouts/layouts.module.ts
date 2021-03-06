import { NgbModule, NgbCarouselConfig, NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import { NgModule } from '@angular/core';
import {RouterModule} from '@angular/router'
import { CommonModule } from '@angular/common';

import { UserComponent } from './user/user.component';
import { SuperAdminComponent } from './super-admin/super-admin.component';
import { AuthComponent } from './auth/auth.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { NavComponent } from './announcement-nave/nav/nav.component';
import { MaterialModule } from 'src/app/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AnnouncementNaveComponent } from './announcement-nave/announcement-nave.component';
import { FooterComponent } from './footer.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { AboutComponent } from './about/about.component';
import { ChangeNameComponent } from 'src/app/views/user/change-name/change-name.component';
import { PrivacyComponent } from './privacy/privacy.component';
import { TermsAndConditionsComponent } from './terms-and-conditions/terms-and-conditions.component';
import { AnnouncementDetailsComponent } from './welcome/announcement-details/announcement-details.component';
import { AddAnnouncementComponent } from './welcome/add-announcement/add-announcement.component';

@NgModule({
  declarations: [
    UserComponent, 
    SuperAdminComponent, 
    AuthComponent, 
    WelcomeComponent, 
    NavComponent,
    AnnouncementNaveComponent,
    FooterComponent,
    ContactUsComponent,
    AboutComponent,
    ChangeNameComponent,
    PrivacyComponent,
    TermsAndConditionsComponent,
    AnnouncementDetailsComponent,
    AddAnnouncementComponent
  ],
  entryComponents: [
    ChangeNameComponent,
    AnnouncementDetailsComponent
  ],

  imports: [
    CommonModule,
    RouterModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    NgbCarouselModule
  ],
  providers:[NgbCarouselConfig]
})
export class LayoutsModule { }
