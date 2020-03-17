import { Validators, FormGroup, FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { MaterialsService } from 'src/app/services/user/materials.service';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'material-category',
  templateUrl: './material-category.component.html',
  styleUrls: ['./material-category.component.css']
})
export class MaterialCategoryComponent implements OnInit {

  categories: Observable<Category[]>;

  newCategory = new FormGroup({
    name: new FormControl('', Validators.required)
  });

  constructor(
    private materialsService: MaterialsService,
    private route: ActivatedRoute
  ) {
    route.parent.paramMap.subscribe((params: ParamMap) => this.categories =
      materialsService.getCategory(params.get('id')));
  }

  ngOnInit() {
  }

  onSubmit() {
    let data = { "name": this.newCategory.value.name };
    let categoryId;
    this.route.parent.paramMap.subscribe((params: ParamMap) => categoryId = params.get('id'));
    this.materialsService.addCategory(categoryId, data);
  }

}
