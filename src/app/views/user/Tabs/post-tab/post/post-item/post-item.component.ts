import { Component, OnInit, Input } from '@angular/core';
import { PostService } from 'src/app/services/user/post.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { EditPostComponent } from '../edit-post/Edit-post.component';
import { Comment } from '@angular/compiler';
import { Observable } from 'rxjs';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { EditCommentComponent } from '../edit-comment/edit-comment.component';
import { CourseService } from 'src/app/services/user/oop/course.service';
import { CommentModel } from 'src/app/services/user/oop/models/CommentModel';
import { PostModel } from 'src/app/services/user/oop/models/PostModel';
import { ReportPostComponent } from '../report-post/report-post.component';


@Component({
  selector: 'app-post-item',
  templateUrl: './post-item.component.html',
  styleUrls: ['./post-item.component.css']
})
export class PostItemComponent implements OnInit {
  @Input() post:PostComment;
  
  courseId;
  constructor( public dialog:MatDialog) {
    //route.parent.paramMap.subscribe((params : ParamMap) =>  this.courseId=params.get('id'));
    
   }
   currentIdPostComment;
  ngOnInit() {
  }
  getDate(date){
    if(date != null)
      return date.toDate();
  }

  CurrPost:PostModel;
  setPost(post){
    this.CurrPost=post;
  }

  editPost(){//console.log(this.CurrPost);
    this.dialog.open(EditPostComponent,{data:this.CurrPost})
  }
  deletePost(){
   // this.ser.deletePost(this.courseId,this.CurrPost["id"]);
   CourseService.posts.delete(this.CurrPost.id);
  } 
  // displayComments(postId):boolean{
  //   return postId==this.currentIdPostComment;
  // }
  comments:Observable <CommentModel[]>;
  flagDisplayComment:boolean = false;
  getComment(postId){
    //this.currentIdPostComment=postId;
    //this.comments=this.commentservice.getPostComments(this.courseId,this.currentIdPostComment);
    
    if(!this.flagDisplayComment){
     // console.log("from getdisplay comment"+this.flagDisplayComment);
    this.comments= CourseService.posts.getComments(postId);
    this.flagDisplayComment=true;
  }else this.flagDisplayComment=false;
   
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

      let data:CommentModel={"id":"" ,"like":0,"dislike":0,"body" :this.newComment.value.text,"commentOwner":"Mostafa Aly"};
      
      //this.commentservice.addPostComment(this.courseId,postId,data);
       CourseService.posts.comment.setCurrentIdPost(postId);
       CourseService.posts.comment.create(data);

      this.newComment.reset();
    } 
}
showit:boolean=false;
addLike(personId: string, postId: string){
  CourseService.posts.addLike('Mostafa Aly', postId);
}
addDisLike(personId: string, postId: string){
  CourseService.posts.addDislike('Mostafa Aly', postId)
}
removeLike(personId: string, postId: string){
  CourseService.posts.removeLike('Mostafa Aly', postId);

}

removedislike(personId: string, postId: string){
  CourseService.posts.removeDisLike('Mostafa Aly', postId);
}
Currcomment:CommentModel;
setComment(comment:CommentModel){
  this.Currcomment=comment;

}

editComment(idPost){console.log(this.Currcomment);
  CourseService.posts.comment.setCurrentIdPost(idPost);
  this.dialog.open(EditCommentComponent,{data:this.Currcomment})
}

deleteComments(idPost){
  CourseService.posts.comment.setCurrentIdPost(idPost);
  CourseService.posts.comment.delete(this.Currcomment.id); 
} 

report(){
  this.dialog.open(ReportPostComponent,{data:this.CurrPost})
}

}
 