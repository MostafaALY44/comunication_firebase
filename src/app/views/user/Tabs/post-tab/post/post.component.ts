import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { PostService } from 'src/app/services/user/post.service';
import { PostFactoryService } from 'src/app/services/user/oop/factories/post-factory.service';
import { Post } from 'src/app/services/user/oop/class/Post';
import { CourseService } from 'src/app/services/user/oop/course.service';
import { PostModel } from 'src/app/services/user/oop/models/PostModel';
import { CommentModel } from 'src/app/services/user/oop/models/CommentModel';
import { CourseDetailsComponent } from '../../../course-details/course-details.component';
import { UserService } from 'src/app/services/user/oop/user.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit,OnDestroy {
   
  coursePosts:Post;
  currentUser;
  
  constructor(private ser: PostService, route:ActivatedRoute) {
    CourseDetailsComponent.displayCourseName.next(false)
    CourseService.subscribeTab("post");
    this.coursePosts=CourseService.posts;
    this.currentUser=UserService.user;
    
  }
  ngOnDestroy(): void {
    //this.removeSubscribe.unsubscribe();
    CourseService.unsubscribeTab("post");
    CourseDetailsComponent.displayCourseName.next(true);
  }

  ngOnInit() {
    

  }

  
  getComments(id){
    return this.coursePosts.getComments(id);
  }
  getStudentPosts(){
    CourseService.SelectStudentPostType();
    this.coursePosts=CourseService.posts;
    let tag1= document.getElementById('1');
    tag1.classList.remove("active");
    let tag2= document.getElementById('2');
    tag2.classList.add("active");
    
  }
  getPostsWithDoctor(){
    CourseService.SelectPostType();
     this.coursePosts=CourseService.posts;
    let tag1= document.getElementById('2');
    tag1.classList.remove("active");
    let tag2= document.getElementById('1');
    tag2.classList.add("active");
    
  }

  

}