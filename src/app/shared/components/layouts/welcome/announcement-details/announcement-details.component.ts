import { WelcomeModel } from './../../../../../services/user/oop/models/WelcomeModel';
import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-announcement-details',
  templateUrl: './announcement-details.component.html',
  styleUrls: ['./announcement-details.component.css']
})
export class AnnouncementDetailsComponent implements OnInit {

  courseDetails:WelcomeModel;

  constructor(@Inject(MAT_DIALOG_DATA) private data:any, private modalService: NgbModal) { 
    this.courseDetails = data;
  }

  ngOnInit() {
  }

  // openScrollableContent(longContent) {
  //   this.modalService.open(longContent, { scrollable: true });
  // }

}
