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
import { SavePersonsDataComponent } from './edit-persons/save-persons-data/save-persons-data.component';
import { CreatePersonsComponent } from './edit-persons/create-persons/create-persons.component';
import { CreatePersonFormComponent } from './edit-persons/create-persons/create-person-form/create-person-form.component';

import { GetCoursesComponent } from './get-courses/get-courses.component';
import { CoursesBodyComponent } from './courses-body/courses-body.component';
import { UpdateCoursesComponent } from './get-courses/update-courses/update-courses.component';
import { ChangeAdminPasswordComponent } from './change-admin-password/change-admin-password.component';
import { GetPersonsComponent } from './edit-persons/get-persons/get-persons.component';
import { DeleteDialogComponent } from './edit-persons/get-persons/delete-dialog/delete-dialog.component';
import { NotValidEmailsComponent } from './edit-persons/create-persons/not-valid-emails/not-valid-emails.component';

@NgModule({
  declarations: [EditCoursesComponent, EditPersonsComponent, ReviewReportsComponent, SavePersonsDataComponent,
     AddSuperAdminComponent, AdminBodyComponent, SaveDataComponent, ShowPostsComponent, CreatePersonsComponent,
     CreatePersonFormComponent, 
      GetCoursesComponent, CoursesBodyComponent, UpdateCoursesComponent, ChangeAdminPasswordComponent, GetPersonsComponent, DeleteDialogComponent, NotValidEmailsComponent],
  entryComponents:[SaveDataComponent, ShowPostsComponent,UpdateCoursesComponent, SavePersonsDataComponent,DeleteDialogComponent,NotValidEmailsComponent],
  imports: [
    CommonModule,
    SuperAdminRoutingModule,
    ReactiveFormsModule,
    MaterialModule,
    FormsModule
  ]
})
export class SuperAdminModule { }
