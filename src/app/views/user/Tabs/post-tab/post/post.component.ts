import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { PostService } from 'src/app/services/user/post.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  
  posts;
  constructor(private ser: PostService, route:ActivatedRoute) {
    route.parent.paramMap.subscribe((params : ParamMap) =>  this.posts=this.ser.getCoursePosts( params.get('id')));
    //this.posts.subscribe(x=>console.log(x));
  }

  ngOnInit() {

  }

}
