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
  
  static polls: Polling;
  static categories: Category;
  static assignments: Observable<Assignment[]>;
  static isCategoryLoad:Observable<boolean>;
  //static notification:{"posts":number,"assignments":number}={"posts":0,"assignments":0};

  static postFactoryService: PostFactoryService;
  private categoryFactoryService: CategoryFactoryService = new CategoryFactoryService(this.firestore);
  private allAssignments: BehaviorSubject<Assignment[]> = new BehaviorSubject([]);
  private pollingFactoryService: PollingFactoryService = new PollingFactoryService(this.firestore)
  //courseId;
  static  removeSub :BehaviorSubject<boolean>=new BehaviorSubject(false);
  constructor(private firestore: AngularFirestore) { 
    CourseService.postFactoryService = new PostFactoryService(this.firestore)
    CourseService.assignments = this.allAssignments.asObservable(); 
    CourseService.removeSub.asObservable().subscribe(isRemove=>{
      if(isRemove){
        if (this.removesubscribe)
          this.removesubscribe.unsubscribe();
        CourseService.postFactoryService.unsubscribe();
        this.pollingFactoryService.unsbuscribe();
        this.categoryFactoryService.unsubscribe();
        CourseService.removeSub.next(false);
      }

    })
  }

  //setCouserId(courseId: string) {
    setUrl(url: string) {
    //this.courseId = courseId;
    AssignmentService.url=url
    this.setPosts(url);
    this.setCategories(url);
    this.setAssignment(url)
    this.setpolls(url);

    
  }

  static subscribeTab(tabName:"post"|"material"|"assignment"){
    switch(tabName){
      case "post":
        CourseService.postFactoryService.subscribe();
        break;
      case "material":
        //this.categoryFactoryService.subscribe();
        break;
      case "assignment":break; 
    }
  };

  static unsubscribeTab(tabName:"post"|"category"|"assignment"){
    switch(tabName){
      case "post":
        CourseService.postFactoryService.unsubscribe();
        break;
      case "category":
        //this.categoryFactoryService.unsubscribe();
        break;
      case "assignment":break;
    }
  };

  setPosts(courseId: string) {
    CourseService.postFactoryService.changeUrl( courseId)
    CourseService.posts = CourseService.postFactoryService.coursePost;
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
