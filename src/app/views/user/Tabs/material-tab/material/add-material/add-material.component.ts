import { ActivatedRoute, ParamMap } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { MaterialsService } from 'src/app/services/user/materials.service';

@Component({
  selector: 'add-material',
  templateUrl: './add-material.component.html',
  styleUrls: ['./add-material.component.css']
})
export class AddMaterialComponent implements OnInit {
  newMaterial = new FormGroup({
    name: new FormControl('', Validators.required),
    date: new FormControl('', [Validators.required]),
    link: new FormControl('', [Validators.required])
  });

  constructor(
    private materialService: MaterialsService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
  }

  // isEmpty(text: string): boolean {
  //   for (let i = 0; i < text.length; i++)
  //     if (text[i] != " ")
  //       return false;
  //   return true;
  // }

  // onSubmit() {
  //   let data = { "name": this.newMaterial.value.name, "date": this.newMaterial.value.date, "link": this.newMaterial.value.link };
  //   let materialId;
  //   this.route.parent.paramMap.subscribe((params: ParamMap) => materialId = params.get('id'));
  //   this.materialService.addMaterial(materialId, data);
  // }

}
