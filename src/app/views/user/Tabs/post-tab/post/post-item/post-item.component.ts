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
import { UserService } from 'src/app/services/user/oop/user.service';


@Component({
  selector: 'app-post-item',
  templateUrl: './post-item.component.html',
  styleUrls: ['./post-item.component.css']
})
export class PostItemComponent implements OnInit {
  @Input() post:PostComment;
  
  courseId;
  currentUser;
  constructor( public dialog:MatDialog) {
    //route.parent.paramMap.subscribe((params : ParamMap) =>  this.courseId=params.get('id'));
    this.currentUser=UserService.getUser();
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

      let data:CommentModel={"id":"" ,"like":0,"reactedPerson" : [], "dislike":0,"body" :this.newComment.value.text,"commentOwner":this.currentUser.name};
      
      //this.commentservice.addPostComment(this.courseId,postId,data);
       CourseService.posts.comment.setCurrentIdPost(postId);
       CourseService.posts.comment.create(data);

      this.newComment.reset();
    } 
}
showit:boolean=false; 
addLike( postId: string){
  if(!this.showit){
  CourseService.posts.addLike(this.currentUser.uid, postId);
    this.showit=true;
  }else this.showit=false;
  //let element = document.getElementById("myDIV");
  //element.classList.toggle("fa-thumbs-down",true);

}
addDisLike( postId: string){
  CourseService.posts.addDislike(this.currentUser.uid, postId)
}
removeLike( postId: string){
 //console.log("______________")
 if(this.showit){
  CourseService.posts.removeLike(this.currentUser.uid, postId);
  this.showit=false;
 }else this.showit=true;
 
}

removedislike( postId: string){ 
  CourseService.posts.removeDisLike(this.currentUser.uid, postId);
}
Currcomment:CommentModel;
setComment(comment:CommentModel){
  this.Currcomment=comment;

}

editComment(idPost){//console.log(this.Currcomment);
  CourseService.posts.comment.setCurrentIdPost(idPost);
  this.dialog.open(EditCommentComponent,{data:this.Currcomment})
}

deleteComments(idPost){
  CourseService.posts.comment.setCurrentIdPost(idPost);
  CourseService.posts.comment.delete(this.Currcomment.id); 
} 
 
report(){
  this.dialog.open(ReportPostComponent,{data:this.CurrPost,height: '200px',
  width: '300px'})
  
}


addCommentLike( commentId: string ,postId:string){
 CourseService.posts.comment.setCurrentIdPost(postId);
  CourseService.posts.comment.addLike(this.currentUser.uid, commentId);
}
addCommentDisLike( commentId: string,postId:string){
  CourseService.posts.comment.setCurrentIdPost(postId);
  CourseService.posts.comment.addDislike(this.currentUser.uid, commentId);
}

}
 