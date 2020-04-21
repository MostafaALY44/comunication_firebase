import { Component, OnInit, Input } from '@angular/core';
import { PostService } from 'src/app/services/user/post.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { EditPostComponent } from '../edit-post/Edit-post.component';
import { Comment } from '@angular/compiler';
import { Observable, Subscription } from 'rxjs';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { EditCommentComponent } from '../edit-comment/edit-comment.component';
import { CourseService } from 'src/app/services/user/oop/course.service';
import { CommentModel } from 'src/app/services/user/oop/models/CommentModel';
import { PostModel } from 'src/app/services/user/oop/models/PostModel';
import { ReportPostComponent } from '../report-post/report-post.component';
import { UserService } from 'src/app/services/user/oop/user.service';
import { element } from 'protractor';
import { User } from 'src/app/services/auth/user.model';



@Component({
  selector: 'app-post-item',
  templateUrl: './post-item.component.html',
  styleUrls: ['./post-item.component.css']
})
export class PostItemComponent implements OnInit {
  @Input() post;
  
  courseId;
  currentUser:User;
  constructor( public dialog:MatDialog , private route : ActivatedRoute ,private router:Router) {
    //route.parent.paramMap.subscribe((params : ParamMap) =>  this.courseId=params.get('id'));
    this.currentUser=UserService.getUser();
   }
   currentIdPostComment;
   isLike:boolean=false;
   isDisLike:boolean=false;
   react:{"like":number, "dislike": number}={"like":0, "dislike": 0};

  ngOnInit() {
     
    //console.log(this.post.x instanceof  Map)
    let react =this.post.react;
    let like:number=0;
    let counter:number=0;
    if(react){
    Object.keys(react).forEach(person=>{
      counter++;
      if((this.isLike == this.isDisLike)){
        if(person == this.currentUser.uid){
          this.isLike=react[person];
          this.isDisLike=!this.isLike;
        }
      }
      if(react[person])
          like++;
    })
    this.react={"like":like, "dislike": counter-like}
  }
// console.log(CourseService.posts.comment.comments)
  }
  getDate(date){
    if(date != null)
      return date.toDate();
  }

  CurrPost:PostModel;
  setPost(post){
    this.CurrPost=post;
  }

  editPost(){
    this.dialog.open(EditPostComponent,{data:this.CurrPost})
  }
  deletePost(){
   
   CourseService.posts.delete(this.CurrPost.id);
  } 
  
  comments:{"commentModel":CommentModel, "like":number, "dislike":number, "isLike" :boolean,"isDisLike" :boolean} []=[];
  flagDisplayComment:boolean = false;
  removeSubscribe:Subscription;
  getComment(postId){
    if(!this.flagDisplayComment){
     this.removeSubscribe= CourseService.posts.getComments(postId)
    .subscribe(comment=>{
      this.comments=[];
     // console.log(comment)
      comment.forEach(element=>{
       let LikeComment:boolean=false;
       let disLikeComment:boolean=false;
       let counter:number=0;
       let like:number=0;
       if(element.react)
       Object.keys(element.react).forEach(person=>{
          counter++;
          if((LikeComment == disLikeComment)){
            if(person == this.currentUser.uid){
              LikeComment=element.react[person];
              disLikeComment=!LikeComment;
            }
          }
          if(element.react[person])
              like++;
        })
       // console.log({...element,"isLike" :LikeComment,"isDisLike" :disLikeComment})
        this.comments.push({"commentModel":element, "like":like, "dislike":counter-like, "isLike" :LikeComment,"isDisLike" :disLikeComment})
      })
    })

    this.flagDisplayComment=true;
  }else{ this.flagDisplayComment=false;
    this.removeSubscribe.unsubscribe();
  }
   
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
      let data:CommentModel={"id":"" ,"react" : null, "body" :this.newComment.value.text,"commentOwner":this.currentUser.name};
       CourseService.posts.comment.setCurrentIdPost(postId);
       CourseService.posts.comment.create(data);

      this.newComment.reset();

      this.flagDisplayComment=false;
      if(this.removeSubscribe)
          this.removeSubscribe.unsubscribe();
      this.getComment(postId);

    } 
}

addLike( postId: string){
    CourseService.posts.addLike(this.currentUser.uid, postId);
}
addDisLike( postId: string){
  CourseService.posts.addDislike(this.currentUser.uid, postId)
}
removeLike( postId: string){
  
    CourseService.posts.removeLike(this.currentUser.uid, postId);
  
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
  this.dialog.open(ReportPostComponent,{data:{ 'post':this.CurrPost, 'urlparam': this.route.parent.paramMap,'router':this.router.url},height: '200px',
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

removeCommentLike( commentId: string ,postId:string){
  CourseService.posts.comment.setCurrentIdPost(postId);
   CourseService.posts.comment.removeLike(this.currentUser.uid, commentId);
 }
 removeCommentDisLike( commentId: string,postId:string){
   CourseService.posts.comment.setCurrentIdPost(postId);
   CourseService.posts.comment.removeDisLike(this.currentUser.uid, commentId);
 }
 
}
 