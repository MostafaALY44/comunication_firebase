import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, OnInit, Inject } from '@angular/core';


@Component({
  selector: 'app-voted-persons',
  templateUrl: './voted-persons.component.html',
  styleUrls: ['./voted-persons.component.css']
})
export class VotedPersonsComponent implements OnInit {

  isEmpty: boolean = false;

  persons = [];
  constructor(@Inject(MAT_DIALOG_DATA) private data: any) {
    this.persons = this.data;
    if (this.persons[0])
      this.isEmpty = true;
  }

  ngOnInit() {
  }

}
