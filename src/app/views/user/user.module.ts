import { EditCategoryComponent } from './Tabs/material-tab/material/edit-category/edit-category.component';
import { EditMaterialComponent } from './Tabs/material-tab/material/edit-material/edit-material.component';
import { NewPostComponent } from './Tabs/post-tab/post/new-post/new-post.component';
import { PostItemComponent } from './Tabs/post-tab/post/post-item/post-item.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserBodyComponent } from './user-body/user-body.component';
import { CourseDetailsComponent } from './course-details/course-details.component';
import { PostComponent } from './Tabs/post-tab/post/post.component';
import { MaterialComponent } from './Tabs/material-tab/material/material.component';
import { AssignmentComponent } from './Tabs/assignment-tab/assignment/assignment.component';
import { MaterialModule } from 'src/app/material.module';
import { MaterialCategoryComponent } from './Tabs/material-tab/material/material-category/material-category.component';
import { MaterialItemsComponent } from './Tabs/material-tab/material/material-items/material-items.component';
import { AssignmentItemsComponent } from './Tabs/assignment-tab/assignment/assignment-items/assignment-items.component';
import { AssignmentSolutionComponent } from './Tabs/assignment-tab/assignment/assignment-solution/assignment-solution.component';
import { ReviewSolutionComponent } from './Tabs/assignment-tab/assignment/review-solution/review-solution.component';
import { AddAssignmentComponent } from './Tabs/assignment-tab/assignment/add-assignment/add-assignment.component';
import { AddMaterialComponent } from './Tabs/material-tab/material/add-material/add-material.component';
import { CoursesService } from 'src/app/services/user/courses.service';
import { ReactiveFormsModule } from '@angular/forms';
import { EditPostComponent } from './Tabs/post-tab/post/edit-post/Edit-post.component';
import { EditAssignmentComponent } from './Tabs/assignment-tab/assignment/edit-assignment/edit-assignment.component';
import { EditCommentComponent } from './Tabs/post-tab/post/edit-comment/edit-comment.component';





@NgModule({
  declarations: 
  [
    UserBodyComponent,
    CourseDetailsComponent,
    PostComponent, 
    MaterialComponent, 
    AssignmentComponent ,
    MaterialCategoryComponent,
    MaterialItemsComponent,
    AssignmentItemsComponent,
    AssignmentSolutionComponent,
    ReviewSolutionComponent,
    AddAssignmentComponent,
    AddMaterialComponent,
    PostItemComponent,
    NewPostComponent,
    EditPostComponent,
    EditAssignmentComponent,
    EditCommentComponent,
    EditMaterialComponent,
    EditCategoryComponent
  ],
  entryComponents: [
    EditPostComponent,
    ReviewSolutionComponent,
    AssignmentSolutionComponent,
    EditAssignmentComponent,
    EditCommentComponent,
    EditMaterialComponent,
    EditCategoryComponent
    
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    MaterialModule,
    ReactiveFormsModule
  ],
  providers:[CoursesService]
  
})
export class UserModule { }
