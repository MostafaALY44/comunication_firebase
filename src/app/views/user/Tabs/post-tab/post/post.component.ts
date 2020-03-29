import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { PostService } from 'src/app/services/user/post.service';
import { Post } from 'src/app/services/user/oop/class/Post';
import { CourseService } from 'src/app/services/user/oop/course.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit,OnDestroy {
  
  posts:Observable<Post[]>;

  removeSubscribe;
  constructor(private ser: PostService, route:ActivatedRoute) {
    this.removeSubscribe=route.parent.paramMap.subscribe(() =>{
      this.posts=CourseService.posts
    })
  }
  ngOnDestroy(): void {
    this.removeSubscribe.unsubscribe();
  }

  ngOnInit() {

  }

}
