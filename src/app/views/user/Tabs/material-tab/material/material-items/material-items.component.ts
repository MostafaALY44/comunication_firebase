import { AddMaterialComponent } from './../add-material/add-material.component';
import { Material } from 'src/app/services/user/oop/class/Material';
import { CourseService } from 'src/app/services/user/oop/course.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'material-items',
  templateUrl: './material-items.component.html',
  styleUrls: ['./material-items.component.css']
})

export class MaterialItemsComponent implements OnInit , OnDestroy{

  // Angular Mateial table resourses
  displayedColumns: string[] = ['name', 'date', 'link', 'operation'];
  dataSource:any;
  ///////////////////////////

  materials: Material;
  isDataLoad:boolean=false

  removeUnsubscribe1;
  removeUnsubscribe2;

  constructor(private route: ActivatedRoute, public dialog: MatDialog) {
    this.removeUnsubscribe1 = CourseService.isCategoryLoad.subscribe(
      (flag) => {
        if (flag) {
          this.isDataLoad = true;

          this.removeUnsubscribe2 = this.route.paramMap.subscribe(
                (params: ParamMap) => {
                this.materials = CourseService.categories.categoriesMap.get(params.get('id'));
                this.materials.subscribeMaterialsFireStore();
                this.dataSource = this.materials.material;
                }
            )

        };
      })
  }

  ngOnDestroy(): void {
    if(this.removeUnsubscribe1)
      this.removeUnsubscribe1.unsubscribe()

      if(this.removeUnsubscribe2)
      this.removeUnsubscribe2.unsubscribe()
  }
  ngOnInit() {
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AddMaterialComponent /*, {
      width: '250px',
      data: {name: this.name, animal: this.animal}
    }*/);

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      //this.animal = result;
    });
  }
}
