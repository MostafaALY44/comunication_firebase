import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Material } from 'src/app/services/user/oop/class/Material';
import { CourseService } from 'src/app/services/user/oop/course.service';
import { MaterialModel } from 'src/app/services/user/oop/models/MaterialModel.model';


@Component({
  selector: 'app-material',
  templateUrl: './material.component.html',
  styleUrls: ['./material.component.css']
})
export class MaterialComponent implements OnInit, OnDestroy {
  categories: Map<string, Material>;

  materials: Material[];

  constructor(route: ActivatedRoute) {
    this.categories = CourseService.categories.categoriesMap;
    // let model:MaterialModel={id:"name", date : "22/3",link : "www.google.com"}
    // let materialClass=CourseService.categories.categoriesMap.get('lab')
    // materialClass.create(model)
    // setTimeout(function (){
    // console.log("$$$$$$$$$$$$$$$$$$$$"+CourseService.categories.categoriesMap.size)},5000)
  }
  
  ngOnDestroy(): void {
  }
  ngOnInit() {
  }
}
