export interface Roles { 
    student?: boolean;
    instructor?: boolean;
    other?: boolean;
 }
  
 export interface User{
    uid:string;
    email:string;
    name:string;
    type: string;
    level:string;
    contact:string;
    belong_to:string;
    background:string;
    roles:Roles;
}