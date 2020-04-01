import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'material-category',
  templateUrl: './material-category.component.html',
  styleUrls: ['./material-category.component.css']
})
export class MaterialCategoryComponent implements OnInit {
 
  @Input() categoryName: string;
  constructor(){
  }
  ngOnInit() {
  }
 
}
