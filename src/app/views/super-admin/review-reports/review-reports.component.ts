import { Component, OnInit, TemplateRef, Inject } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { ReportService } from 'src/app/services/user/report.service';
import { Observable } from 'rxjs';
import { PostReport } from 'src/app/services/user/models/report.model';
import { CourseService } from 'src/app/services/user/oop/course.service';
import { PostService } from 'src/app/services/user/oop/firebaseService/PostService';
import { firestore } from 'firebase';
import { AngularFirestore } from '@angular/fire/firestore';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ShowPostsComponent } from './show-posts/show-posts.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PostModel } from 'src/app/services/user/oop/models/PostModel';
import { AuthenticationService } from 'src/app/services/auth/authentication.service';


@Component({
  selector: 'review-reports',
  templateUrl: './review-reports.component.html',
  styleUrls: ['./review-reports.component.css']
})
export class ReviewReportsComponent implements OnInit {

   reports:Observable<PostReport[]>;
   universityId;
   collegeId;
   dataSource:Observable<PostReport[]>;
  postService;
  post:PostModel;
  
  constructor( public dialog:MatDialog,private route:ActivatedRoute, 
    private reportService: ReportService ,private firestore: AngularFirestore, private _snackBar: MatSnackBar,router:Router) { 
      AuthenticationService.currentAdminLink= router.url;
      this.route.parent.paramMap.subscribe((param:ParamMap)=>{
      this.universityId=param.get('id1');
      this.collegeId=param.get('id2');
      this.reports=this.reportService.getReports(this.universityId,this.collegeId);
      this.dataSource=this.reports;
      
    }).unsubscribe(); 

   
  } 

  displayedColumns: string[] = ['report', 'date', 'personId','show','action'];
isEmpty:boolean=false;
  ngOnInit() {
   this.reports.subscribe(report=>{
      if(report.length===0)
         this.isEmpty=true;
    })
  }

  getDate(date){
    if(date != null)
      return date.toDate();
  }
  
  deletePost(url:string,postId,report){
    if(postId)
        this.postService=new PostService(this.firestore).delete(url,postId);
    this.reportService.deleteReport(this.universityId,this.collegeId,report["id"]);
    this._snackBar.open('this Post', 'Deleted Successfully', { duration: 3000, });
    
   } 

   curReport:PostReport;
   deleteReport(report){
     this.curReport=report;
    this.reportService.deleteReport(this.universityId,this.collegeId,this.curReport["id"]);
   }

   showPost(url,postId){
    // console.log(url, "_____ ",postId)
    this.dialog.open(ShowPostsComponent,{data:{'url':url, 'postId':postId}});
    
   }
    
} 

