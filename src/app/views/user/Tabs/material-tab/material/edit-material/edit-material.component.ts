import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { MaterialsService } from 'src/app/services/user/materials.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'app-edit-material',
  templateUrl: './edit-material.component.html',
  styleUrls: ['./edit-material.component.css']
})
export class EditMaterialComponent implements OnInit {
  newMaterial = new FormGroup({
    name : new FormControl(this.data.material.name,Validators.required),
    date : new FormControl(this.data.material.date,Validators.required),
    link : new FormControl(this.data.material.link,Validators.required),
  });
  constructor(private ser: MaterialsService, private route:ActivatedRoute,@Inject(MAT_DIALOG_DATA) private data:any) { }

  ngOnInit() {
  }
  isEmpty(text:string):boolean{
    for(let i=0;i<text.length;i++)
      if(text[i] != " ")
        return false;
    return true;
  }
 
  onSubmit(){
      let courseId=this.data.courseId;
      let idMaterial= this.data.material.id
      this.data.material= {"name" :this.newMaterial.value.name,
                            "date":this.newMaterial.value.date,
                            "link":this.newMaterial.value.link,
                          };
      this.ser.editMaterial(courseId, idMaterial, this.data.material);
  }
}
