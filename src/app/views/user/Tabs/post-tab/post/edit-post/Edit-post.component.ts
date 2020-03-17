import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PostService } from 'src/app/services/user/post.service';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.css']
})
export class EditPostComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) private data:any,
  private ser: PostService, private route:ActivatedRoute) { }

  newPost = new FormGroup({
    title : new FormControl(this.data.post.title,Validators.required),
    body : new FormControl(this.data.post.body,[Validators.required, Validators.minLength(4)])
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
      let courseId=this.data.courseId;
      let idPost= this.data.post.id
      this.data.post= {"date":this.data.post.date,"like" :this.data.post.like, "dislike":this.data.post.dislike, "postOwner":this.data.post.postOwner, "title":this.newPost.value.title, "body": this.newPost.value.body};
      this.ser.editPost(courseId, idPost, this.data.post);
    }
  }
}
