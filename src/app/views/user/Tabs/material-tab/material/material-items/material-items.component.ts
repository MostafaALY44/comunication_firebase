import { AngularFirestore } from '@angular/fire/firestore';
import { Material } from './../../../../../../services/user/oop/class/Material';
import { MaterialModel } from './../../../../../../services/user/oop/models/MaterialModel.model';
import { AddMaterialComponent } from './../add-material/add-material.component';
import { CourseService } from 'src/app/services/user/oop/course.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'material-items',
  templateUrl: './material-items.component.html',
  styleUrls: ['./material-items.component.css']
})

export class MaterialItemsComponent implements OnInit , OnDestroy{
  // Angular Mateial table resourses
  displayedColumns: string[] = ['name', 'date', 'link', 'operation'];
  dataSource:any;
  ///////////////////////////

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
  ngOnInit() {
  }

  newMaterialObj: MaterialModel;
  materialName: string = "Lecture#0";
  materialDate: string = "10-10-2010";
  materialLink: string = "www.facebook.com";

  public materialClass = CourseService.categories.categoriesMap.get('lab');

  openDialog(): void {
    const dialogRef = this.dialog.open(AddMaterialComponent , {
      // height: '400px', //to determine the window size.
      // width: '600px',  //to determine the window size.
      data: {id: this.materialName, date: this.materialDate, link: this.materialLink }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log('The dialog\'s data ' + result); // result is a json object that contain the form data 
      this.newMaterialObj = result;
      // this.animal = result;
    });
    
    this.addMaterial();
  }

  // addMaterial(newMaterialObj:MaterialModel){
  //   console.log("addMaterial() is called !!!");
  //   this.route.paramMap.subscribe((params: ParamMap) => this.currentCategory = params.get('id'));
  //   let materialClass = CourseService.categories.categoriesMap.get(this.currentCategory); // http://localhost:4200/user/comp204/material/currentCategory
  //   materialClass.create(newMaterialObj);
  // }

  currentCategory: string;
  addMaterial(){
    console.log("addMaterialTest() is called !!!");
    this.route.paramMap.subscribe((params: ParamMap) => this.currentCategory = params.get('id'));
    let model:MaterialModel={id:"lab#7", date : "22/3",link : "www.googledrive.com"}
    let materialClass = CourseService.categories.categoriesMap.get(this.currentCategory) // http://localhost:4200/user/comp204/material/currentCategory
    materialClass.create(model)
    console.log("addMaterialTest() is called  22222 !!!");

  }

  
}
