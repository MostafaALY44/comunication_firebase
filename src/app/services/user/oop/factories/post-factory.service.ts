import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Post } from '../class/Post';
import { AngularFirestore } from '@angular/fire/firestore';
import { PostService } from '../firebaseService/PostService';
import { CommentService } from '../firebaseService/CommentService';
import { Comment } from '../class/Comment'
import { map } from 'rxjs/operators';
import { PostModel } from '../models/PostModel';

@Injectable({
  providedIn: 'root'
})
export class PostFactoryService {
 
  removeUnsubscribe1;
  removeUnsubscribe2;
  private allposts: BehaviorSubject<Post[]>=new BehaviorSubject([]);
  posts: Observable<Post[]>;
  private postsTemp :Post[]=[];

  private postService:PostService =new PostService(this.firestore);
  private commentService:CommentService = new CommentService(this.firestore);
  constructor(private url:string, private firestore: AngularFirestore) {
    this.url+='/posts/';
    this.posts=this.getPosts();
   }

   /*getPosts(url?:string):Observable<PostModel[]>{
     return this.postService.getAll(this.url);
   }*/
  flag:boolean=false;
  getPosts(url?:string):Observable<Post[]>{
    let postNames=this.postService.getAll(this.url);

    if(this.removeUnsubscribe1)  
          this.removeUnsubscribe1.unsubscribe();

    this.removeUnsubscribe1=postNames.subscribe((posts)=>{
      this.flag =false;
      posts.forEach(post=>{        
      if(!(this.postsTemp.find(x=> x.post.id===post.id))){
          this.flag=true;  
          let x=new Post(this.url, post, this.firestore)
          x.comments=this.getComments(post.id);
          this.postsTemp.push(x)
        }})
      if(this.flag){
        this.flag =false;
        this.allposts.next(this.postsTemp);
      }})

      this.posts=this.allposts.asObservable();
      return this.posts;
    }

    getComments(id:string):Observable<Comment[]>{
      //console.log(this.url+'/categories/'+id+'/comments/');
      let  commentsTemp :Comment[]=[];
      let commentsBehavior: BehaviorSubject<Comment[]>=new BehaviorSubject([]);
      let flag:boolean=false
  
        this.removeUnsubscribe2=this.commentService.getAll(this.url+id+'/comments').subscribe(
            comments=>{ 
              flag=false;
              comments.forEach(comment=>{
              if(!(commentsTemp.find(x=> x.comment.id===comment.id))){
                  commentsTemp.push(new Comment(this.url, this.firestore, comment))
                  flag=true;
                }
               })
               if(flag)
                 commentsBehavior.next(commentsTemp);
              })
            //if(commentsTemp[0])
            //console.log(commentsTemp.length)
        
        return commentsBehavior.asObservable();
    }
  }

  

