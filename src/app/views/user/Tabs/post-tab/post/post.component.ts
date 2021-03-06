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
  IsShowMore:boolean=false;
  constructor(private ser: PostService, route:ActivatedRoute) {
    CourseDetailsComponent.displayCourseName.next(false)
    CourseService.subscribeTab(this.postType);
    this.coursePosts=CourseService.posts;
    this.currentUser=UserService.user;
    this.IsShowMore=this.coursePosts.checkPost;
    
  }
  ngOnDestroy(): void {
    //this.removeSubscribe.unsubscribe();
    CourseService.unsubscribeTab(this.postType);
    CourseDetailsComponent.displayCourseName.next(true);
  }

  ngOnInit() {
    

  }

  
  getComments(id){
    return this.coursePosts.getComments(id);
  }
  getStudentPosts(){
    PostFactoryService.limit=2;
    this.postType="StudentPost";
    CourseService.SelectStudentPostType();
    this.coursePosts=CourseService.posts;
    let tag1= document.getElementById('1');
    tag1.classList.remove("active");
    let tag2= document.getElementById('2');
    tag2.classList.add("active");
    // this.coursePosts.checkPost=false;
    this.IsShowMore=this.coursePosts.checkPost;
  }
  getPostsWithDoctor(){
    PostFactoryService.limit=2;
    this.postType="post";
    CourseService.SelectPostType();
     this.coursePosts=CourseService.posts;
    let tag1= document.getElementById('2');
    tag1.classList.remove("active");
    let tag2= document.getElementById('1');
    tag2.classList.add("active");
    // this.coursePosts.checkPost=false;
    this.IsShowMore=this.coursePosts.checkPost;
  }
postType:string="post";
  showMore(){
    PostFactoryService.limit+=2;
    CourseService.unsubscribeTab(this.postType);
    CourseService.subscribeTab(this.postType);
    this.IsShowMore=this.coursePosts.checkPost;
  }  

}