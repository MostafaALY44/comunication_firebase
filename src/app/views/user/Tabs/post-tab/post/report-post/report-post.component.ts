import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PostModel } from 'src/app/services/user/oop/models/PostModel';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CourseService } from 'src/app/services/user/oop/course.service';
import { ReportService } from 'src/app/services/user/report.service';
import { PostReport } from 'src/app/services/user/models/report.model';
import { UserService } from 'src/app/services/user/oop/user.service';
import { ParamMap, ActivatedRoute, Params, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-report-post',
  templateUrl: './report-post.component.html',
  styleUrls: ['./report-post.component.css']
})
export class ReportPostComponent implements OnInit {
  currentUser;
  universityId;
  collegeId;
  constructor(@Inject(MAT_DIALOG_DATA) private data:{'post':PostModel, 'urlparam':Observable<ParamMap>,'router':Router},
  private ser: ReportService,private route:ActivatedRoute, private _snackBar: MatSnackBar) { 
    
    data.urlparam.subscribe((param:Params)=>{
      this.universityId=  param.get('id1')//for ASU
      this.collegeId= param.get('id2')//for science
    })
    //  console.log(this.universityId)
    //  console.log(this.collegeId)
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
      let idPost= this.data.post.id
      let data1={'personId':this.currentUser.uid,'postId':idPost,'report':this.reportPost.value.report,'postUrl':CourseService.posts.getUrl()}
     // let reportText=this.reportPost.value.report;
    this.data.urlparam.subscribe((param:Params)=>{
      this.universityId=  param.get('id1')//for ASU
      this.collegeId= param.get('id2')//for science
      this.ser.addReport(this.universityId,this.collegeId,data1);
      
    }).unsubscribe();
      
    this._snackBar.open('Your Report', 'Sent Successfully', { duration: 3000, });
      
    }
  }
}
