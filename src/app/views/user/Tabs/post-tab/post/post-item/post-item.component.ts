import { Component, OnInit, Input } from '@angular/core';
import { PostService } from 'src/app/services/user/post.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { EditPostComponent } from '../edit-post/Edit-post.component';
import { CommentService } from 'src/app/services/user/comment.service';
import { Comment } from '@angular/compiler';
import { Observable } from 'rxjs';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { EditCommentComponent } from '../edit-comment/edit-comment.component';


@Component({
  selector: 'app-post-item',
  templateUrl: './post-item.component.html',
  styleUrls: ['./post-item.component.css']
})
export class PostItemComponent implements OnInit {
  @Input() post:PostComment;
  courseId;
  constructor(private ser:PostService, private route:ActivatedRoute, public dialog:MatDialog, private commentservice:CommentService) {
    route.parent.paramMap.subscribe((params : ParamMap) =>  this.courseId=params.get('id'));
   }
   currentIdPostComment;
  ngOnInit() {
  }
  getDate(date){
    if(date != null)
      return date.toDate();
  }

  CurrPost;
  setPost(post){
    this.CurrPost=post;
  }

  editPost(){//console.log(this.CurrPost);
    this.dialog.open(EditPostComponent,{data:{"post":this.CurrPost,"courseId":this.courseId}})
  }
  deletePost(){
    this.ser.deletePost(this.courseId,this.CurrPost["id"]);
  } 
  displayComments(postId):boolean{
    return postId==this.currentIdPostComment;
  }
  comments:Observable <Comments[]>;
  getComment(postId){
    this.currentIdPostComment=postId;
    this.comments=this.commentservice.getPostComments(this.courseId,this.currentIdPostComment);
  }
  newComment = new FormGroup({
    text : new FormControl('')
    
  });
  isEmpty(text:string):boolean{
    for(let i=0;i<text.length;i++)
      if(text[i] != " ")
        return false;
    return true;
  }

  onSubmit(postId){

    if(!this.isEmpty(this.newComment.value.text)){

      let data={"text" :this.newComment.value.text,"commentOwner":"Mostafa Aly"};
      
      this.commentservice.addPostComment(this.courseId,postId,data);
      this.newComment.reset();
    } 

}
Currcomment;
setComment(comment){
  this.Currcomment=comment;

}

editComment(idPost){console.log(this.Currcomment);
  this.dialog.open(EditCommentComponent,{data:{"comment":this.Currcomment,"postId":idPost,"courseId":this.courseId}})
}
deleteComments(idPost){
  this.commentservice.deleteComment(this.courseId,idPost,this.Currcomment['id']); 
} 

}
 