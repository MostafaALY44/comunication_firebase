import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommentModel } from 'src/app/services/user/oop/models/CommentModel';
import { CourseService } from 'src/app/services/user/oop/course.service';

@Component({
  selector: 'app-edit-comment',
  templateUrl: './edit-comment.component.html',
  styleUrls: ['./edit-comment.component.css']
})
export class EditCommentComponent implements OnInit {

  editComment = new FormGroup({
    body : new FormControl(this.data.body)
  });
  constructor(@Inject(MAT_DIALOG_DATA) private data:CommentModel) { }

  ngOnInit() {
  }
  isEmpty(text:string):boolean{
    for(let i=0;i<text.length;i++)
      if(text[i] != " ")
        return false;
    return true;
  }
 
  onSubmit(){
    if(!this.isEmpty(this.editComment.value.body)){
     this.data.body=this.editComment.value.body;
     CourseService.posts.comment.update(this.data.id,this.data);
   
    
    }
  }
 
}
