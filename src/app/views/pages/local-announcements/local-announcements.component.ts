import { Component, OnInit } from '@angular/core';
import { AddAnnouncementsComponent } from '../add-announcements/add-announcements.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-local-announcements',
  templateUrl: './local-announcements.component.html',
  styleUrls: ['./local-announcements.component.css']
})
export class LocalAnnouncementsComponent implements OnInit {

  constructor(private dialog:MatDialog) { }

  ngOnInit() {
  }

  addAnnouncement(){
    this.dialog.open(AddAnnouncementsComponent, {data:{"scope":"local"}})
  }

}
