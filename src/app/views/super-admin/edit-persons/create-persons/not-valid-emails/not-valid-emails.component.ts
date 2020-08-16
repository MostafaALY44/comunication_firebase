import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-not-valid-emails',
  templateUrl: './not-valid-emails.component.html',
  styleUrls: ['./not-valid-emails.component.css']
})
export class NotValidEmailsComponent implements OnInit {
emails;
  constructor(public dialogRef: MatDialogRef<NotValidEmailsComponent>,@Inject(MAT_DIALOG_DATA) private data) {
      this.emails=this.data;
   }
   onClose(){
    this.dialogRef.close();
  }
  ngOnInit() {
  }

}
