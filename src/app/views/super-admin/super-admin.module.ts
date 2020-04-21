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
import { AddItherDetailsComponent } from './edit-persons/create-persons/add-ither-details/add-ither-details.component';


@NgModule({
  declarations: [EditCoursesComponent, EditPersonsComponent, ReviewReportsComponent, AddSuperAdminComponent, AdminBodyComponent, SaveDataComponent, ShowPostsComponent, SavePersonsDataComponent, CreatePersonsComponent, CreatePersonFormComponent, AddItherDetailsComponent],
  entryComponents:[SaveDataComponent,
     ShowPostsComponent,
     SavePersonsDataComponent],
  imports: [
    CommonModule,
    SuperAdminRoutingModule,
    ReactiveFormsModule,
    MaterialModule,
    FormsModule
  ]
})
export class SuperAdminModule { }
