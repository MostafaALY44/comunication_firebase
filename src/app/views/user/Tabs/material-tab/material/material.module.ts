import { AddMaterialComponent } from './add-material/add-material.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialRoutingModule } from './material-routing.module';
import { MaterialCategoryComponent } from './material-category/material-category.component';
import { MaterialItemsComponent } from './material-items/material-items.component';
import { EditMaterialComponent } from './edit-material/edit-material.component';



@NgModule({
  declarations: [MaterialCategoryComponent, MaterialItemsComponent, AddMaterialComponent, EditMaterialComponent],
  imports: [
    CommonModule,
    MaterialRoutingModule
  ]
})
export class MaterialModule { }
