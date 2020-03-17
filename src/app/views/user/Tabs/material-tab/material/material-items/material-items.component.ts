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


  materials:Observable<Material[]>;

  constructor(private service:MaterialsService, route:ActivatedRoute) {
    route.parent.paramMap.subscribe((params : ParamMap) =>  this.materials = service.getMaterial(params.get('id')));
   }

  ngOnInit() {
  }

  getDate(date){
    if(date != null)
      return date.toDate();
  }
}
