import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { Post } from './class/Post';
import { Category } from 'src/app/services/user/oop/class/category';
import { PostFactoryService } from './factories/post-factory.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { AssignmentService } from '../assignment.service';
import { CategoryFactoryService } from './factories/category-factory.service';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})

export class CourseService {

  static posts: Post; 
  static categories: Category;
  static assignments: Observable<Assignment[]>;
  static isCategoryLoad:Observable<boolean>;
  static notification:{"posts":number,"assignments":number}={"posts":0,"assignments":0};

  static postFactoryService: PostFactoryService;
  private categoryFactoryService: CategoryFactoryService = new CategoryFactoryService(this.firestore);
  private allAssignments: BehaviorSubject<Assignment[]> = new BehaviorSubject([]);

  //courseId;
  constructor(private firestore: AngularFirestore) { 
    CourseService.postFactoryService = new PostFactoryService(this.firestore)
    CourseService.assignments = this.allAssignments.asObservable(); 
  }

  //setCouserId(courseId: string) {
    setUrl(url: string) {
    //this.courseId = courseId;
    AssignmentService.url=url
    this.setPosts(url);
    this.setCategories(url);
    this.setAssignment(url)
    
    // let course=UserService.loadedCourses.get(courseId)
    // if(!course){
    //   this.setPosts(courseId);
    //   this.setCategories(courseId);
    //   this.setAssignment(courseId)
    //   console.log(course)
    //   console.log(courseId)
    //   let newCourse={  posts: Object.assign({},CourseService.posts),
    //     categories: Object.assign({},CourseService.categories),
    //     assignments: Object.assign({},CourseService.assignments),
    //     isCategoryLoad: Object.assign({},CourseService.isCategoryLoad)
    //   }
    //   UserService.loadedCourses.set(courseId, newCourse)
    //   //course=UserService.loadedCourses.get(courseId)
    //   console.log(UserService.loadedCourses)
      
    // }else{
    //   course=UserService.loadedCourses.get(courseId)
    //   CourseService.posts=course.posts
    //   CourseService.categories=course.categories
    //   CourseService.isCategoryLoad=course.isCategoryLoad
    //   CourseService.assignments=course.assignments
    // }
    
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
}
