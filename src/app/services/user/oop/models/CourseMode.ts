export interface NotificationModel{
    postsNumber:number;
    categoriesNumber:number;
    assignmentsNumber:number;
  }
  
export class Course{
    code:string;
    postsNumber:number;
    categoriesNumber:number;
    assignmentsNumber:number;
    deletePostsNumber:number;
    deleteAssignmentNumber:number;
}