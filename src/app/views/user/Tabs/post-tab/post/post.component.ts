import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { PostService } from 'src/app/services/user/post.service';
import { PostFactoryService } from 'src/app/services/user/oop/factories/post-factory.service';
import { Post } from 'src/app/services/user/oop/class/Post';
import { CourseService } from 'src/app/services/user/oop/course.service';
import { PostModel } from 'src/app/services/user/oop/models/PostModel';
import { CommentModel } from 'src/app/services/user/oop/models/CommentModel';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit,OnDestroy {
  
  coursePosts:Post;
  removeSubscribe;
  constructor(private ser: PostService, route:ActivatedRoute) {
    //route.parent.paramMap.subscribe((params : ParamMap) =>  this.posts=this.ser.getCoursePosts( params.get('id')));
    //this.posts.subscribe(x=>console.log(x));
    //this.posts=this.postFactory.getPosts('/courses/comp204/posts');
    this.removeSubscribe=route.parent.paramMap.subscribe(() =>this.coursePosts=CourseService.posts)
    
    //})
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
