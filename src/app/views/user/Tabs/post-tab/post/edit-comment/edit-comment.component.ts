import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { CommentService } from 'src/app/services/user/comment.service';
import { ActivatedRoute } from '@angular/router';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-comment',
  templateUrl: './edit-comment.component.html',
  styleUrls: ['./edit-comment.component.css']
})
export class EditCommentComponent implements OnInit {

  editComment = new FormGroup({
    text : new FormControl(this.data.comment.text)
  });
  constructor(private service: CommentService, private route:ActivatedRoute,@Inject(MAT_DIALOG_DATA) private data:any) { }

  ngOnInit() {
  }
  isEmpty(text:string):boolean{
    for(let i=0;i<text.length;i++)
      if(text[i] != " ")
        return false;
    return true;
  }
 
  onSubmit(){
    if(!this.isEmpty(this.editComment.value.text)){
      let courseId=this.data.courseId;
      let idPost= this.data.postId;
     this.data.comment.text=this.editComment.value.text;
     //console.log(this.data.comment);
      this.service.editComment(courseId, idPost,this.data.comment.id,this.data.comment);
    
    }
  }
 
}
