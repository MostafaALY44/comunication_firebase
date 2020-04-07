import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AddMaterialComponent } from './add-material/add-material.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialRoutingModule } from './material-routing.module';
import { MaterialCategoryComponent } from './material-category/material-category.component';
import { MaterialItemsComponent } from './material-items/material-items.component';
import { EditMaterialComponent } from './edit-material/edit-material.component';
import { EditCategoryComponent } from './edit-category/edit-category.component';
import { AddCategoryComponent } from './add-category/add-category.component';



@NgModule({
  declarations: [
    MaterialCategoryComponent, 
    MaterialItemsComponent, 
    AddMaterialComponent, 
    EditMaterialComponent, 
    EditCategoryComponent, 
    AddCategoryComponent, 
    ],
  imports: [
    CommonModule,
    
    //MaterialRoutingModule
  ]
})
export class MaterialModule { }
