import { AnnouncementDetailsComponent } from './announcement-details/announcement-details.component';
import { MatDialog } from '@angular/material/dialog';
import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { WelcomeService } from 'src/app/services/announcement/welcome.service';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';

interface BannerImage {
  url: string;
  caption: string;
}

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnDestroy {

  images: BannerImage[] = [
    { url: 'assets/images/lab1.jpg', caption: '' },
    { url: 'assets/images/lab2.jpg', caption: '' },
    { url: 'assets/images/lab3.jpg', caption: '' },
    { url: 'assets/images/lab4.jpg', caption: '' },
    { url: 'assets/images/lab5.jpg', caption: '' },
    { url: 'assets/images/lab6.jpg', caption: '' },
    { url: 'assets/images/lab7.jpg', caption: '' },
    { url: 'assets/images/lab8.jpg', caption: '' },
    { url: 'assets/images/lab9.jpg', caption: '' },
    { url: 'assets/images/books.jpg', caption: '' }
  ];

  announcements;
  removeSubscribe: Subscription;

  constructor(private service: WelcomeService, config: NgbCarouselConfig, private dialog: MatDialog) {

    this.removeSubscribe = this.service.getAnnouncement()
    .subscribe(announcement => {
      this.announcements = announcement
    })

    //NgbCarouselConfig
    config.interval = 5000;
    config.wrap = true;
    config.keyboard = true;
    config.pauseOnHover = false;
  }

  ngOnDestroy(): void {
    if (this.removeSubscribe)
      this.removeSubscribe.unsubscribe();
  }

  announcementDetails(announcement) {
    this.dialog.open(AnnouncementDetailsComponent, { data: announcement, height: '500px', width: '800px' });
  }

  calculateDaysDiff(dateSent) {
    let currentDate = new Date();
    dateSent = new Date(dateSent);
    return Math.floor((Date.UTC(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate()) - Date.UTC(dateSent.getFullYear(), dateSent.getMonth(), dateSent.getDate())) / (1000 * 60 * 60 * 24));
  }
}
