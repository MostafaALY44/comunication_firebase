import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PostService } from 'src/app/services/user/post.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { PostModel } from 'src/app/services/user/oop/models/PostModel';
import { CoursesService } from 'src/app/services/user/courses.service';
import { CourseService } from 'src/app/services/user/oop/course.service';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.css']
})
export class EditPostComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) private data:PostModel) { }

  newPost = new FormGroup({
    title : new FormControl(this.data.title,Validators.required),
    body : new FormControl(this.data.body,[Validators.required, Validators.minLength(4)])
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
    if(!this.isEmpty(this.newPost.value.body)){
   // let courseId=this.data.courseId;
      let idPost= this.data.id
      this.data= {"id" : this.data.id, "react" :this.data.react, "postOwner":this.data.postOwner, "title":this.newPost.value.title, "body": this.newPost.value.body};
      //this.ser.editPost(courseId, idPost, this.data.post);
      CourseService.posts.update(idPost,this.data);
      
    }
  }
}
