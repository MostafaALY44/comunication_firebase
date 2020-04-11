import { EditMaterialComponent } from './../edit-material/edit-material.component';
import { AngularFirestore } from '@angular/fire/firestore';
import { Material } from './../../../../../../services/user/oop/class/Material';
import { MaterialModel } from './../../../../../../services/user/oop/models/MaterialModel.model';
import { AddMaterialComponent } from './../add-material/add-material.component';
import { CourseService } from 'src/app/services/user/oop/course.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'material-items',
  templateUrl: './material-items.component.html',
  styleUrls: ['./material-items.component.css']
})

export class MaterialItemsComponent implements OnDestroy {
  // Angular Mateial table resourses
  displayedColumns: string[] = ['name', 'date', 'link', 'operation'];
  dataSource: any;
  ///////////////////////////

  currentCategory: string;
  targetMaterial: MaterialModel = {id:"name", date:"date", link:"link"};

  materials: Material;
  isDataLoad: boolean = false

  removeUnsubscribe1;
  removeUnsubscribe2;

  constructor(private route: ActivatedRoute, public dialog: MatDialog, private _snackBar: MatSnackBar) {

    this.removeUnsubscribe1 = CourseService.isCategoryLoad.subscribe(
      (flag) => {
        if (flag) {
          this.isDataLoad = true;
          this.removeUnsubscribe2 = this.route.paramMap.subscribe(
            (params: ParamMap) => {
              if (CourseService.categories.categoriesMap.get(params.get('id')))
              this.materials = CourseService.categories.categoriesMap.get(params.get('id')).material;
              this.dataSource  = this.materials.subscribeMaterialsFireStore();
              this.dataSource = this.materials.material;
            }
          )
          
        };
      })
  }

  selectedMaterial(currentMaterial: MaterialModel) {
    this.targetMaterial = currentMaterial;
  }

  addMaterial() {
    const dialogRef = this.dialog.open(AddMaterialComponent, { data: this.targetMaterial });
    dialogRef.afterClosed().subscribe(result => {
      this.route.paramMap.subscribe((params: ParamMap) => this.currentCategory = params.get('id'));
      let materialClass = CourseService.categories.categoriesMap.get(this.currentCategory).material;
      materialClass.create(result);
    });
  }

  updateMaterial() {
    let oldId = this.targetMaterial.id;
    const dialogRef = this.dialog.open(EditMaterialComponent, { data: this.targetMaterial });
    dialogRef.afterClosed().subscribe(updatedMaterialItem => {
      this.route.paramMap.subscribe((params: ParamMap) => this.currentCategory = params.get('id'));
      CourseService.categories.categoriesMap.get(this.currentCategory).material.update(this.targetMaterial.id, updatedMaterialItem);
      CourseService.categories.categoriesMap.get(this.currentCategory).material.delete(oldId);
    });
  }

  deleteMaterial() {
    this.route.paramMap.subscribe((params: ParamMap) => this.currentCategory = params.get('id'));
    CourseService.categories.categoriesMap.get(this.currentCategory).material.delete(this.targetMaterial.id);
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, { duration: 3000, });
  }

  ngOnDestroy(): void {
    if (this.removeUnsubscribe1)
      this.removeUnsubscribe1.unsubscribe()

    if (this.removeUnsubscribe2)
      this.removeUnsubscribe2.unsubscribe()
  }

}
