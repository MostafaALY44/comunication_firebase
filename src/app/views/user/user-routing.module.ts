import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserBodyComponent } from './user-body/user-body.component';
import { CourseDetailsComponent } from './course-details/course-details.component';
import { MaterialComponent } from './Tabs/material-tab/material/material.component';
import { AssignmentComponent } from './Tabs/assignment-tab/assignment/assignment.component';
import { PostComponent } from './Tabs/post-tab/post/post.component';
import { MaterialItemsComponent } from './Tabs/material-tab/material/material-items/material-items.component';
import { AssignmentItemsComponent } from './Tabs/assignment-tab/assignment/assignment-items/assignment-items.component';
import { ReviewSolutionComponent } from './Tabs/assignment-tab/assignment/review-solution/review-solution.component';
import { PollingComponent } from './Tabs/polling-tab/polling/polling.component';


const routes: Routes = [
  {path: '', component: UserBodyComponent,
  children: [
      {
        path:':id',
        component: CourseDetailsComponent,
        children: [
          {
            path:'post',
            component: PostComponent,
          },
          {
            path:'material',
            component: MaterialComponent,
            children:[
              {
                path:':id',
                component: MaterialItemsComponent
              }
            ]
          },
          {
            path:'assingment',
            component: AssignmentComponent,
            children:
            [
              {path:'assigment-items' , component: AssignmentItemsComponent}
              
            ]
          },
          {
            path:'polling',
            component: PollingComponent,
          }
        ]
      }
    ]
  },
  {path: ':id', component: CourseDetailsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
