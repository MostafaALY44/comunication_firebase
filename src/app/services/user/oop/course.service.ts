import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { Post } from './class/Post';
import { Category } from 'src/app/services/user/oop/class/category';
import { PostFactoryService } from './factories/post-factory.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { AssignmentService } from '../assignment.service';
import { CategoryFactoryService } from './factories/category-factory.service';
import { UserService } from './user.service';
import { Polling } from './class/Polling';
import { PollingFactoryService } from './factories/polling-factory.service';

@Injectable({
  providedIn: 'root'
})

export class CourseService {

  static posts: Post; 
  static studentPosts:Post;
  static doctorStudentPosts: Post;
  static polls: Polling;
  static categories: Category;
  static assignments: Observable<Assignment[]>;
  static isCategoryLoad:Observable<boolean>;
  //static notification:{"posts":number,"assignments":number}={"posts":0,"assignments":0};

  static postFactoryService: PostFactoryService;
   static studentPostFactoryService: PostFactoryService;
  private categoryFactoryService: CategoryFactoryService = new CategoryFactoryService(this.firestore);
  private allAssignments: BehaviorSubject<Assignment[]> = new BehaviorSubject([]);
  private pollingFactoryService: PollingFactoryService = new PollingFactoryService(this.firestore)
  //courseId;
  static  removeSub :BehaviorSubject<boolean>=new BehaviorSubject(false);
  constructor(private firestore: AngularFirestore) { 
    CourseService.postFactoryService = new PostFactoryService(this.firestore)
     CourseService.studentPostFactoryService = new PostFactoryService(this.firestore)
    CourseService.assignments = this.allAssignments.asObservable(); 
    CourseService.removeSub.asObservable().subscribe(isRemove=>{
      if(isRemove){
        if (this.removesubscribe)
          this.removesubscribe.unsubscribe();
        CourseService.postFactoryService.unsubscribe();
        CourseService.studentPostFactoryService.unsubscribe();
        this.pollingFactoryService.unsbuscribe();
        this.categoryFactoryService.unsubscribe();
        CourseService.removeSub.next(false);
      }

    })
  }

   static courseId:string="";
    setUrl(url: string) {
    CourseService.courseId = url;
    AssignmentService.url=url
    this.setPosts(url);
    this.setStudentPosts(url);
    this.setCategories(url);
    this.setAssignment(url)
    this.setpolls(url);

    
  }

  static subscribeTab(tabName:"post"|"material"|"assignment"|"StudentPost"){
    switch(tabName){
      case "post":
        CourseService.postFactoryService.subscribe();
        // CourseService.studentPostFactoryService.subscribe();
        break;
      case "StudentPost":
        
        CourseService.studentPostFactoryService.subscribe();
        break;
      case "material":
        //this.categoryFactoryService.subscribe();
        break;
      case "assignment":break; 
    }
  };

  static unsubscribeTab(tabName:"post"|"category"|"assignment"|"StudentPost"){
    switch(tabName){
      case "post":
        CourseService.postFactoryService.unsubscribe();
        // CourseService.studentPostFactoryService.unsubscribe();
        break;
      case "StudentPost":
       
        CourseService.studentPostFactoryService.unsubscribe();
        break;
      case "category":
        //this.categoryFactoryService.unsubscribe();
        break;
      case "assignment":break;
    }
  };

  setPosts(courseId?: string) {
   if(courseId){
     CourseService.courseId= courseId;
   }
    CourseService.postFactoryService.changeUrl( CourseService.courseId,'/posts')
    CourseService.doctorStudentPosts = CourseService.postFactoryService.coursePost;
    CourseService.SelectPostType();
  }
  setStudentPosts(courseId?: string){
    if(courseId){
     CourseService.courseId= courseId;
    }
    CourseService.studentPostFactoryService.changeUrl( CourseService.courseId,'/studentPosts')
    
    CourseService.studentPosts = CourseService.studentPostFactoryService.coursePost;
    // CourseService.SelectStudentPostType();
  }

  static SelectStudentPostType(){
    CourseService.posts = CourseService.studentPosts;
  }

  static SelectPostType(){
    CourseService.posts = CourseService.doctorStudentPosts;
    
  }
  setCategories(courseId: string) {
    this.categoryFactoryService.changeUrl( courseId);
    CourseService.categories = this.categoryFactoryService.category;
    CourseService.isCategoryLoad=this.categoryFactoryService.isLoad();
  }
  
  removesubscribe;
  setAssignment(courseId: string) {
    this.allAssignments.next([]);
    if (this.removesubscribe)
      this.removesubscribe.unsubscribe();
    this.removesubscribe = new AssignmentService(this.firestore).getAssingment(courseId).subscribe(assignments => this.allAssignments.next(assignments));

  }
  setpolls(courseId: string) {
    this.pollingFactoryService.changeUrl( courseId)
    CourseService.polls = this.pollingFactoryService.coursePolling;
  }
}
