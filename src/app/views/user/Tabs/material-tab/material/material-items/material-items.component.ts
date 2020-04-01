import { Material } from 'src/app/services/user/oop/class/Material';
import { MaterialModel } from './../../../../../../services/user/oop/models/MaterialModel.model';
import { CourseService } from 'src/app/services/user/oop/course.service';
import { EditMaterialComponent } from './../edit-material/edit-material.component';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { MaterialsService } from 'src/app/services/user/materials.service';

@Component({
  selector: 'material-items',
  templateUrl: './material-items.component.html',
  styleUrls: ['./material-items.component.css']
})
export class MaterialItemsComponent implements OnInit {


  // @Input() materials:Material[];
  materials: Material;

  // material: Material;
  // currentCategory: string;


  constructor(private route: ActivatedRoute) {
    route.parent.paramMap.subscribe(
      (params: ParamMap) => {
        console.log("===============>"+params.get('id'));
          // this.materials = CourseService.categories.materials.subscribeMaterialsFireStore();
        this.materials = CourseService.categories.categoriesMap.get(params.get('id'));
        // this.materials.subscribeMaterialsFireStore();

        console.log(this.materials.material);
      }
    );
  }

  ngOnInit() {
  }
}
