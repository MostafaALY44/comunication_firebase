import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { AnnouncementsComponent } from './announcements/announcements.component';
import { LocalAnnouncementsComponent } from './local-announcements/local-announcements.component';
import { GlobalAnnouncementsComponent } from './global-announcements/global-announcements.component';
import { MaterialModule } from 'src/app/material.module';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { AddAnnouncementsComponent } from './add-announcements/add-announcements.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [AnnouncementsComponent, LocalAnnouncementsComponent, GlobalAnnouncementsComponent, AddAnnouncementsComponent],
  imports: [
    CommonModule,
    PagesRoutingModule,
    MaterialModule,
    AngularFontAwesomeModule,
    ReactiveFormsModule
  ],
  entryComponents: [AddAnnouncementsComponent]
})
export class PagesModule { }
