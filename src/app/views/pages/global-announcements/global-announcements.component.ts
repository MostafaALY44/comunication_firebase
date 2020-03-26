import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddAnnouncementsComponent } from '../add-announcements/add-announcements.component';
import { GlobalAnnouncementService } from 'src/app/services/announcement/global-announcement.service';

@Component({
  selector: 'app-global-announcements',
  templateUrl: './global-announcements.component.html',
  styleUrls: ['./global-announcements.component.css']
})
export class GlobalAnnouncementsComponent implements OnInit {

  constructor(private dialog: MatDialog, private gloalAnnnouncementService:GlobalAnnouncementService) {}

  ngOnInit() {
  }
  
  addAnnouncement(){    
    const refDialog=this.dialog.open(AddAnnouncementsComponent, {data:{"announcement":{"scope":"global"}, "tags":this.gloalAnnnouncementService.globalTags}})
  }

}
