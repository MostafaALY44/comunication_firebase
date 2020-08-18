export interface NotificationModel{
    postsNumber:number;
    categoriesNumber:Map<string,number>;
    assignmentsNumber:number;
    pollingsNumber?:number;
  }
  
export class Course{
    code:string;
    postsNumber:number;
    categoriesNumber:any;
    assignmentsNumber:number;
    pollingsNumber?:number;
    deletePostsNumber:number;
    deleteAssignmentNumber:number;
    description:string;
    contacts:string;
}