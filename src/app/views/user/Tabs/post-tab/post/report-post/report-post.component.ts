import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PostModel } from 'src/app/services/user/oop/models/PostModel';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CourseService } from 'src/app/services/user/oop/course.service';

@Component({
  selector: 'app-report-post',
  templateUrl: './report-post.component.html',
  styleUrls: ['./report-post.component.css']
})
export class ReportPostComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) private data:PostModel) { }

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
  console.log("-------------------------------");
      let idPost= this.data.id
      
      let reportText=this.reportPost.value.report;
      CourseService.posts.reportPost("Mostafa Aly",idPost,reportText);
      
    }
  }
}
