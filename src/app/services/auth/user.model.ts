import { DocumentReference } from '@angular/fire/firestore/interfaces';
import { Course } from '../user/oop/models/CourseMode';

export interface Roles { 
    student?: boolean;
    instructor?: boolean;
    other?: boolean;
 }
 
 export interface College{
     id:string;
     name:string;
     courseCodes:Course[];
 }
 export interface university{
     id:string;
     name:string;
     colleges:College[]
 }
 export interface token{

 }
  
 export class User{
    uid:string;
    email:string;
    emailVerified:boolean=false;
    name:string;
    type: string;
    level:string;
    contact:string;
    belong_to:string;
    background:string;
    roles:Roles;
    universities:university[];
    fcmTokens:token;
    univeristy:any;
}