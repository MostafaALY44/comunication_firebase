import { EditMaterialComponent } from './../edit-material/edit-material.component';
import { AngularFirestore } from '@angular/fire/firestore';
import { Material } from './../../../../../../services/user/oop/class/Material';
import { MaterialModel } from './../../../../../../services/user/oop/models/MaterialModel.model';
import { AddMaterialComponent } from './../add-material/add-material.component';
import { CourseService } from 'src/app/services/user/oop/course.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { User } from 'src/app/services/auth/user.model';
import { UserService } from 'src/app/services/user/oop/user.service';
import { Category } from 'src/app/services/user/oop/class/category';
import { NotificationService } from 'src/app/services/user/oop/notification.service';


@Component({
  selector: 'material-items',
  templateUrl: './material-items.component.html',
  styleUrls: ['./material-items.component.css']
})

export class MaterialItemsComponent implements  OnDestroy {
  // Angular Mateial table resourses
  displayedColumns: string[] = ['name', 'date', 'link', 'operation'];
  displayedColumns1: string[] = ['name', 'date', 'link'];
  dataSource;
  ///////////////////////////
 
  currentCategory: string;
  targetMaterial: MaterialModel = {id:"name",userId:"userId", date:"date", link:"link"};
  private userService:UserService=new UserService(this.firestore)
  materials: Material;
  isDataLoad: boolean = false

  removeUnsubscribe1;
  removeUnsubscribe2;
  removeUnsubscribe3;
  currentUser:User;
  isEmpty:boolean=false;
  constructor(private route: ActivatedRoute, router:Router, public dialog: MatDialog,  private firestore: AngularFirestore) {

    this.removeUnsubscribe1 = CourseService.isCategoryLoad.subscribe(
      (flag) => {
        if (flag) {
          this.isDataLoad = true;
          this.removeUnsubscribe2 = this.route.paramMap.subscribe(
            (params: ParamMap) => {
              if (this.removeUnsubscribe3)
                  this.removeUnsubscribe3.unsubscribe()
              
              if(CourseService.categories.categoriesMap.has(params.get('id'))){
                this.materials = CourseService.categories.categoriesMap.get(params.get('id')).material;
              
                let currentCategoryId:string=CourseService.categories.categoriesMap.get(params.get('id')).id;
                this.removeUnsubscribe3=this.materials.subscribeMaterialsFireStore().subscribe(materials=>{
                  this.dataSource=materials;
                  // to know if material is empty
                  if(!materials.length){
                    this.isEmpty=true;}
                    else this.isEmpty=false;

                  let obj={[UserService.indexNotification+".categoriesNumber."+currentCategoryId]:materials.length}
                  this.userService.update( obj)
                  NotificationService.currNotification.categoriesNumber.delete(currentCategoryId);
			            NotificationService.currNotification.categoriesNumber.set(currentCategoryId, 0)
                }) 
              }else{
                let r= router.url.slice(0, -params.get('id').length) 
                
                if(CourseService.categories.categoriesMap.size){
                let ff=true;
                CourseService.categories.categoriesMap.forEach((value:{id: string;material: Material;}, key:string)=>{
                  if(ff){
                    ff=false;
                    router.navigate([r+key])
                  }
                  
                })
              }else{
                router.navigate([r])
              }
                  //this.materials = value.material;
                //this.dataSource=this.materials.subscribeMaterialsFireStore();
              
              }
              /*this.dataSource = CourseService.categories.categoriesMap.get(params.get('id')).material.material;
              this.dataSource = this.materials.subscribeMaterialsFireStore();
              */
            }
          )
          
        };
      })
      this.currentUser= UserService.getUser();
  }

  selectedMaterial(currentMaterial: MaterialModel) {
    this.targetMaterial = currentMaterial;
  }

  addMaterial() {
    this.dialog.open(AddMaterialComponent, {data:this.route.paramMap});
  }

  updateMaterial() {
    this.dialog.open(EditMaterialComponent, { data: {"material":this.targetMaterial, "UrlParam":this.route.paramMap} });
  }

  deleteMaterial() {
    this.route.paramMap.subscribe((params: ParamMap) => this.currentCategory = params.get('id'));
    CourseService.categories.categoriesMap.get(this.currentCategory).material.delete(this.targetMaterial.id);
  }

  ngOnDestroy(): void {
    if (this.removeUnsubscribe1)
      this.removeUnsubscribe1.unsubscribe()

    if (this.removeUnsubscribe2)
      this.removeUnsubscribe2.unsubscribe()

    if (this.removeUnsubscribe3)
      this.removeUnsubscribe3.unsubscribe()

    if (this.materials)
      this.materials.unsubscribe();
  }

}
