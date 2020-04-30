import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Post } from '../class/Post';
import { AngularFirestore } from '@angular/fire/firestore';
import { PostService } from '../firebaseService/PostService';
import { CommentService } from '../firebaseService/CommentService';
import { Comment } from '../class/Comment'
import { map } from 'rxjs/operators';
import { PostModel } from '../models/PostModel';
import { NotificationService } from '../notification.service';
import { CourseFirebaseService } from '../firebaseService/course-firebase.service';
import { UserService } from '../user.service';
import { CourseService } from '../course.service';

@Injectable({
  providedIn: 'root'
})
export class PostFactoryService implements OnDestroy {
 
  removeUnsubscribe1;
  //removeUnsubscribe2;
  public coursePost:Post=new Post(this.firestore) ;
  //private allposts: BehaviorSubject<PostModel[]>=new BehaviorSubject([]);
  //posts: Observable<Post[]>;
  //private postsTemp :Post[]=[];

  //private postService:PostService =new PostService(this.firestore);
  //private commentService:CommentService = new CommentService(this.firestore);
  private url:string;
  constructor( private firestore: AngularFirestore) {}
   private userService:UserService=new UserService(this.firestore)
   changeUrl(url:string){
      if(this.removeUnsubscribe1)  
        this.removeUnsubscribe1.unsubscribe();
      this.coursePost.reset();
      this.url=url;
      this.coursePost.changeUrl(this.url); 
      this.setPosts();
   }

  private setPosts(){
    this.removeUnsubscribe1=this.coursePost.getAll().subscribe((posts)=>{
      this.coursePost.posts=posts;
      })
   }   
   private setPosts2(){
    this.removeUnsubscribe1=this.coursePost.getAll().subscribe((posts)=>{
      
       let obj={[UserService.indexNotification+".postNumber"]:posts.length}
        
      this.userService.update( obj)
      if(NotificationService.currNotification)
        NotificationService.currNotification.postsNumber=0
      this.coursePost.posts=posts;})
   }   

  subscribe(){
    this.unsubscribe();
     this.setPosts2();
   }
   unsubscribe(){
    if(this.removeUnsubscribe1)  
      this.removeUnsubscribe1.unsubscribe();
   }
  ngOnDestroy(): void {
    if(this.removeUnsubscribe1)  
          this.removeUnsubscribe1.unsubscribe();
  }

  }