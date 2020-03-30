import { Component, OnInit, OnDestroy } from '@angular/core';
import { MaterialsService } from 'src/app/services/user/materials.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
//import { Category } from 'src/app/services/user/models/category';
import { Observable } from 'rxjs';

import { Category } from 'src/app/services/user/oop/class/category';
import { Material } from 'src/app/services/user/oop/class/Material';
import { CategoryFactoryService } from 'src/app/services/user/oop/class/category-factory.service';
import { CourseService } from 'src/app/services/user/oop/course.service';

@Component({
  selector: 'app-material',
  templateUrl: './material.component.html',
  styleUrls: ['./material.component.css']
})
export class MaterialComponent implements OnInit, OnDestroy {
  categories:Map<string,Material>;
  //materials :Observable<Material[]>[]=[];
  constructor(route:ActivatedRoute) { 
    // route.parent.paramMap.subscribe((params : ParamMap)=>{
    //   //if(!(materialService.allCAtegories)){console.log("materialService.allCAtegories "+materialService.allCAtegories )
    //     this.categories=materialService.getCategories('/courses/'+params.get('id'));//}
    //   /*else{console.log("materialService.allCAtegories22222222222 "+materialService.allCAtegories )
    //     this.categories= materialService.allCAtegories;}*/
    // })
    //CourseService.categories.subscribeTabsFireStore();
    //route.parent.paramMap.subscribe( (params : ParamMap)=>{ 
      this.categories=CourseService.categories.categoriesMap;
      /*this.categories.forEach((value: Material, key: string) => {
        console.log(key, value);
      });*/
    //})

    
  }
  ngOnDestroy(): void {
    //console.log("MaterialComponent==>ngOnDestroy ")
    //CourseService.categories.unsubscribeTabsFireStore();
  }

  ngOnInit() {
  }

}
