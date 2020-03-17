import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SuperAdminComponent } from 'src/app/shared/components/layouts/super-admin/super-admin.component';
import { EditCoursesComponent } from './edit-courses/edit-courses.component';
import { EditPersonsComponent } from './edit-persons/edit-persons.component';
import { ReviewReportsComponent } from './review-reports/review-reports.component';
import { AdminBodyComponent } from './admin-body/admin-body.component';
import { AddSuperAdminComponent } from './add-super-admin/add-super-admin.component';


const routes: Routes = [
  {
    path:'',component:AdminBodyComponent,
    children:[
      {
        path:'edit-courses',component:EditCoursesComponent
      },
      {
        path:'edit-persons',component:EditPersonsComponent
      },
      {
        path:'review-reports',component:ReviewReportsComponent

      },
      {
        path:'add-super-admin',component:AddSuperAdminComponent
      }
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SuperAdminRoutingModule { }
