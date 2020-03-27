import { Component, OnInit } from '@angular/core';
import { MaterialsService } from 'src/app/services/user/materials.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Category } from 'src/app/services/user/models/category';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-material',
  templateUrl: './material.component.html',
  styleUrls: ['./material.component.css']
})
export class MaterialComponent implements OnInit {
  categories:Observable<Category[]>;
  constructor(materialService:MaterialsService, route:ActivatedRoute) { 
    route.parent.paramMap.subscribe((params : ParamMap)=>{
      //if(!(materialService.allCAtegories)){console.log("materialService.allCAtegories "+materialService.allCAtegories )
        this.categories=materialService.getCategories('/courses/'+params.get('id'));//}
      /*else{console.log("materialService.allCAtegories22222222222 "+materialService.allCAtegories )
        this.categories= materialService.allCAtegories;}*/
    })
    
  }

  ngOnInit() {
  }

}
