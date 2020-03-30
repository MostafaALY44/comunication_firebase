import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { PostService } from 'src/app/services/user/post.service';
import { Post } from 'src/app/services/user/oop/class/Post';
import { CourseService } from 'src/app/services/user/oop/course.service';
import { CommentModel } from 'src/app/services/user/oop/models/CommentModel';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit,OnDestroy {
  
  posts:Observable<Post[]>;
  coursePosts:Post;
  posts:Observable<Post[]>;

  removeSubscribe;
  constructor(private ser: PostService, route:ActivatedRoute) {
    //route.parent.paramMap.subscribe((params : ParamMap) =>  this.posts=this.ser.getCoursePosts( params.get('id')));
    //this.posts.subscribe(x=>console.log(x));
    //this.posts=this.postFactory.getPosts('/courses/comp204/posts');
    this.removeSubscribe=route.parent.paramMap.subscribe(() =>{this.posts=CourseService.posts
    })
    //})
    //route.parent.paramMap.subscribe((params : ParamMap) =>  this.posts=this.ser.getCoursePosts( params.get('id')));
    //this.posts.subscribe(x=>console.log(x));
    //this.posts=this.postFactory.getPosts('/courses/comp204/posts');
    this.removeSubscribe=route.parent.paramMap.subscribe(() =>this.coursePosts=CourseService.posts)
    
    //})
    this.removeSubscribe=route.parent.paramMap.subscribe(() =>{
      this.posts=CourseService.posts
    })
  }
  ngOnDestroy(): void {
    this.removeSubscribe.unsubscribe();
  }

  ngOnInit() {
  }

  
  getComments(id){
    return this.coursePosts.getComments(id);
  }

}
