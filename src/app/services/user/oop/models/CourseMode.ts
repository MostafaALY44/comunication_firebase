export interface NotificationModel{
    postsNumber:number;
    categoriesNumber:Map<string,number>;
    assignmentsNumber:number;
  }
  
export class Course{
    code:string;
    postsNumber:number;
    categoriesNumber:any;
    assignmentsNumber:number;
    deletePostsNumber:number;
    deleteAssignmentNumber:number;
}