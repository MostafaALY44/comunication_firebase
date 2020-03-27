import { EditMaterialComponent } from './../edit-material/edit-material.component';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { MaterialsService } from 'src/app/services/user/materials.service';

@Component({
  selector: 'material-items',
  templateUrl: './material-items.component.html',
  styleUrls: ['./material-items.component.css']
})
export class MaterialItemsComponent implements OnInit {


  // materials:Observable<Material[]>;
  // courseId;

  // constructor(private materialsService: MaterialsService, route: ActivatedRoute, private dialog: MatDialog) {
  //   route.parent.paramMap.subscribe((params: ParamMap) => {
  //     this.courseId = params.get('id');
  //     this.materials = materialsService.getMaterial(this.courseId)
  //   }
  //   );
  // }

   ngOnInit() {
   }

  // getDate(date){
  //   if(date != null)
  //     return date.toDate();
  // }

  // currentMaterial;
  // setMaterial(material){
  //   this.currentMaterial = material;
  // }
  // deleteMaterial(){
  //   this.materialsService.deleteMaterial(this.courseId,this.currentMaterial["id"]);
  // } 
  // editMaterial(){
  //   this.dialog.open(EditMaterialComponent,{data:{"material":this.currentMaterial,"courseId":this.courseId}})
  // }
}
