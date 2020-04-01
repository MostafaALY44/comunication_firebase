import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { Post } from './class/Post';
import { Category } from 'src/app/services/user/oop/class/category';
import { PostFactoryService } from './factories/post-factory.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { AssignmentService } from '../assignment.service';
import { CategoryFactoryService } from './factories/category-factory.service';

@Injectable({
  providedIn: 'root'
})

export class CourseService {

  static posts: Post;
  static categories: Category;
  static assignments: Observable<Assignment[]>;

  private postFactoryService: PostFactoryService = new PostFactoryService(this.firestore)
  private categoryFactoryService: CategoryFactoryService = new CategoryFactoryService(this.firestore);
  private allAssignments: BehaviorSubject<Assignment[]> = new BehaviorSubject([]);

  courseId;
  constructor(private firestore: AngularFirestore) { 
    CourseService.assignments = this.allAssignments.asObservable(); 
  }

  setCouserId(courseId: string) {
    this.courseId = courseId;
    this.setPosts(courseId);
    this.setCategories(courseId);
    this.setAssignment(courseId)
  }

  setPosts(courseId: string) {
    this.postFactoryService.changeUrl('/courses/' + courseId)
    CourseService.posts = this.postFactoryService.coursePost;
  }
  setCategories(courseId: string) {
    this.categoryFactoryService.changeUrl('/courses/' + courseId);
    CourseService.categories = this.categoryFactoryService.category;
  }
  removesubscribe;
  setAssignment(courseId: string) {
    this.allAssignments.next([]);
    if (this.removesubscribe)
      this.removesubscribe.unsubscribe();
    this.removesubscribe = new AssignmentService(this.firestore).getAssingment(courseId).subscribe(assignments => this.allAssignments.next(assignments));

  }
}
