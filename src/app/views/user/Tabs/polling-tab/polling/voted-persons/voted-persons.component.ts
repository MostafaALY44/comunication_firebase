import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, OnInit, Inject } from '@angular/core';


@Component({
  selector: 'app-voted-persons',
  templateUrl: './voted-persons.component.html',
  styleUrls: ['./voted-persons.component.css']
})
export class VotedPersonsComponent implements OnInit {

  isEmpty: boolean = false;

   persons:string[];
  constructor(@Inject(MAT_DIALOG_DATA) private data: any) {

    this.persons = this.data;

    // if ( this.persons && this.persons.length > 0) {
    //   this.persons = this.data;
    // } else {
    //   this.isEmpty = true;
    // }
    
  }

  ngOnInit() {
  }

}
