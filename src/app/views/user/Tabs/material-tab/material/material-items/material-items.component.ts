import { Material } from 'src/app/services/user/oop/class/Material';
import { MaterialModel } from './../../../../../../services/user/oop/models/MaterialModel.model';
import { CourseService } from 'src/app/services/user/oop/course.service';
import { EditMaterialComponent } from './../edit-material/edit-material.component';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { MaterialsService } from 'src/app/services/user/materials.service';
import { Route } from '@angular/compiler/src/core';
import { Category } from 'src/app/services/user/oop/class/category';

@Component({
  selector: 'material-items',
  templateUrl: './material-items.component.html',
  styleUrls: ['./material-items.component.css']
})
export class MaterialItemsComponent implements OnInit , OnDestroy{


  // @Input() materials:Material[];
  materials: Material;
  isDataLoad:boolean=false
  

  removeUnsubscribe1;
  removeUnsubscribe2;
  constructor(private route: ActivatedRoute) {
    this.removeUnsubscribe1=CourseService.isCategoryLoad.subscribe((flag)=>{
      if(flag){
        this.isDataLoad=true;
      this.removeUnsubscribe2=this.route.paramMap.subscribe( (params: ParamMap) => {
          this.materials=CourseService.categories.categoriesMap.get(params.get('id'));
          this.materials.subscribeMaterialsFireStore();
      })};
      })
    
    //this.categories = CourseService.categories.categoriesMap;
    
  }
  ngOnDestroy(): void {
    if(this.removeUnsubscribe1)
      this.removeUnsubscribe1.unsubscribe()

      if(this.removeUnsubscribe2)
      this.removeUnsubscribe2.unsubscribe()
  }



  ngOnInit() {
    /*setTimeout(function (){
      console.log("$$$$$$$$$$$$$$$$$$$$"+CourseService.categories.categoriesMap.)},5000)*/
  }
}
