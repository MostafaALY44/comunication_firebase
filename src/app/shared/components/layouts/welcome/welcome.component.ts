import { WelcomeModel } from './../../../../services/user/oop/models/WelcomeModel';
import { AnnouncementDetailsComponent } from './announcement-details/announcement-details.component';
import { MatDialog } from '@angular/material/dialog';
import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { WelcomeService } from 'src/app/services/announcement/welcome.service';
import { NgbCarouselConfig, NgbDate } from '@ng-bootstrap/ng-bootstrap';

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
    { url: 'assets/images/books.jpg', caption: 'Books' },
    { url: 'assets/images/green.jpg', caption: 'Green' },
    { url: 'assets/images/labAndBook.jpg', caption: 'Lab and Book' },
    { url: 'assets/images/labTop.jpg', caption: 'Easy Rejsteration' },
  ];

  announcements;
  announcementId;

  removeSubscribe: Subscription;

  constructor(private service: WelcomeService, config: NgbCarouselConfig, private dialog: MatDialog) {

    this.removeSubscribe = this.service.getAnnouncement().subscribe(announcement => {
      this.announcements = announcement
    })

    config.interval = 5000;
    config.wrap = false;
    config.keyboard = false;
    config.pauseOnHover = false;
  }

  ngOnDestroy(): void {
    if (this.removeSubscribe)
      this.removeSubscribe.unsubscribe();
  }

  isFocus: boolean = false;
  resiveIsFocusSearchEvent(event) {
    this.isFocus = event;
  }

  announcementDetails(announcement) {
    this.dialog.open(AnnouncementDetailsComponent, { data: announcement, height: '500px', width: '800px' });
  }


  private createDateFromNgbDate(ngbDate: any): Date {
    const date: Date = new Date(Date.UTC(ngbDate.year, ngbDate.month - 1, ngbDate.day));
    return date;
  }



  private getTimeAgo(announcement: WelcomeModel): number {
    const fromDate: Date = this.createDateFromNgbDate(this.currentDate);
    const toDate: Date = this.createDateFromNgbDate(announcement.date);
    const daysDiff = Math.floor(Math.abs(<any>fromDate - <any>toDate) / (1000 * 60 * 60 * 24));
    console.log(daysDiff);
    return daysDiff;
  }

  currentDate = Date();

  calculateDiff(dateSent) {
    let currentDate = new Date();
    dateSent = new Date(dateSent);
    return Math.floor((Date.UTC(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate()) - Date.UTC(dateSent.getFullYear(), dateSent.getMonth(), dateSent.getDate())) / (1000 * 60 * 60 * 24));
  }
}
