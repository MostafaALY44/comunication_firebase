import { EditMaterialComponent } from './../edit-material/edit-material.component';
import { AngularFirestore } from '@angular/fire/firestore';
import { Material } from './../../../../../../services/user/oop/class/Material';
import { MaterialModel } from './../../../../../../services/user/oop/models/MaterialModel.model';
import { AddMaterialComponent } from './../add-material/add-material.component';
import { CourseService } from 'src/app/services/user/oop/course.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'material-items',
  templateUrl: './material-items.component.html',
  styleUrls: ['./material-items.component.css']
})

export class MaterialItemsComponent implements  OnDestroy{
  // Angular Mateial table resourses
  displayedColumns: string[] = ['name', 'date', 'link', 'operation'];
  dataSource:any;
  ///////////////////////////

  currentCategory: string;
  targetMaterial: MaterialModel = {id:"", date:"", link:""};

  materials: Material;
  isDataLoad:boolean=false

  removeUnsubscribe1;
  removeUnsubscribe2;

  constructor(private route: ActivatedRoute, public dialog: MatDialog) {
    this.removeUnsubscribe1 = CourseService.isCategoryLoad.subscribe(
      (flag) => {
        if (flag) {
          this.isDataLoad = true;
          this.removeUnsubscribe2 = this.route.paramMap.subscribe(
                (params: ParamMap) => {
                this.materials = CourseService.categories.categoriesMap.get(params.get('id'));
                this.materials.subscribeMaterialsFireStore();
                this.dataSource = this.materials.material;
                }
            )

        };
      })
  }

  ngOnDestroy(): void {
    if(this.removeUnsubscribe1)
      this.removeUnsubscribe1.unsubscribe()

      if(this.removeUnsubscribe2)
      this.removeUnsubscribe2.unsubscribe()
  }

  openDialog(fromAction: string): void {
    if (fromAction === "addMaterial"){
      const dialogRef = this.dialog.open(AddMaterialComponent , {data: this.targetMaterial});
      dialogRef.afterClosed().subscribe(result => {
        if(result)
          this.addMaterialItem(result);
      });

    }else if (fromAction === "editMaterial"){
      const dialogRef = this.dialog.open(EditMaterialComponent , {data: this.targetMaterial});
      dialogRef.afterClosed().subscribe(result => {this.updateMaterial(result);});
    }
    
  }
  
  
  selectedMaterial(currentMaterial:MaterialModel){
    this.targetMaterial = currentMaterial;
  }

  addMaterialItem(materialItem: MaterialModel){
      this.route.paramMap.subscribe((params: ParamMap) => this.currentCategory = params.get('id'));
    let materialClass = CourseService.categories.categoriesMap.get(this.currentCategory);
    materialClass.create(materialItem)
  }

  updateMaterial(newMaterial: MaterialModel){
    this.route.paramMap.subscribe((params: ParamMap) => this.currentCategory = params.get('id'));
    CourseService.categories.categoriesMap.get(this.currentCategory).update(this.targetMaterial.id, newMaterial);
  }

  deleteMaterial(){
    this.route.paramMap.subscribe((params: ParamMap) => this.currentCategory = params.get('id'));
    CourseService.categories.categoriesMap.get(this.currentCategory).delete(this.targetMaterial.id);
  }
  
}
