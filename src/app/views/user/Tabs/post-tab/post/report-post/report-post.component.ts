import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PostModel } from 'src/app/services/user/oop/models/PostModel';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CourseService } from 'src/app/services/user/oop/course.service';
import { ReportService } from 'src/app/services/user/report.service';
import { PostReport } from 'src/app/services/user/models/report.model';
import { UserService } from 'src/app/services/user/oop/user.service';

@Component({
  selector: 'app-report-post',
  templateUrl: './report-post.component.html',
  styleUrls: ['./report-post.component.css']
})
export class ReportPostComponent implements OnInit {
  currentUser;
  constructor(@Inject(MAT_DIALOG_DATA) private data:PostModel,private ser: ReportService) { 

    this.currentUser=UserService.getUser();
  }

  reportPost = new FormGroup({
    report : new FormControl('',Validators.required),
    
  }); 
 
  ngOnInit() {
  }
 
  isEmpty(text:string):boolean{
    for(let i=0;i<text.length;i++)
      if(text[i] != " ")
        return false;
    return true;
  }

  onSubmit(){
    if(!this.isEmpty(this.reportPost.value.report)){
  //console.log("-------------------------------");
      let idPost= this.data.id
      let data1={'personId':this.currentUser.uid,'postId':idPost,'report':this.reportPost.value.report}
     // let reportText=this.reportPost.value.report;
     this.ser.addReport(data1);
      
    }
  }
}
