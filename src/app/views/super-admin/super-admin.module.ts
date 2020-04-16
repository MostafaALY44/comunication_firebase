import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SuperAdminRoutingModule } from './super-admin-routing.module';
import { EditCoursesComponent } from './edit-courses/edit-courses.component';
import { EditPersonsComponent } from './edit-persons/edit-persons.component';
import { ReviewReportsComponent } from './review-reports/review-reports.component';
import { AddSuperAdminComponent } from './add-super-admin/add-super-admin.component';
import { AdminBodyComponent } from './admin-body/admin-body.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material.module';
import { SaveDataComponent } from './edit-courses/save-data/save-data.component';
import { ShowPostsComponent } from './review-reports/show-posts/show-posts.component';


@NgModule({
  declarations: [EditCoursesComponent, EditPersonsComponent, ReviewReportsComponent, AddSuperAdminComponent, AdminBodyComponent, SaveDataComponent, ShowPostsComponent],
  entryComponents:[SaveDataComponent, ShowPostsComponent],
  imports: [
    CommonModule,
    SuperAdminRoutingModule,
    ReactiveFormsModule,
    MaterialModule,
    FormsModule
  ]
})
export class SuperAdminModule { }
