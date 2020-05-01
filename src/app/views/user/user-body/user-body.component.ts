import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';

import { Observable, Subscription } from 'rxjs';
import { UserService } from 'src/app/services/user/oop/user.service';
import { User } from 'src/app/services/auth/user.model';
import { MessagingService } from 'src/app/services/auth/messaging.service';
import { CourseService } from 'src/app/services/user/oop/course.service';
import { NotificationModel } from 'src/app/services/user/oop/models/CourseMode';
import { NotificationService } from 'src/app/services/user/oop/notification.service';
import { NestedTreeControl } from '@angular/cdk/tree';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { ChangeNameComponent } from '../change-name/change-name.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

interface Tree{
  name:string;
  link?:string;
  children?: Tree[];
}

@Component({
  selector: 'user-body',
  templateUrl: './user-body.component.html',
  styleUrls: ['./user-body.component.css']
})
export class UserBodyComponent implements OnInit,OnDestroy { 
  treeControl = new NestedTreeControl<Tree>(node => node.children);
  dataSource = new MatTreeNestedDataSource<Tree>();
  hasChild = (_: number, node: Tree) => !!node.children && node.children.length > 0;

  @ViewChild('tree', {static:false}) tree;
  treeUniversity:Tree[]=[]
  courses : User;
  notification: NotificationModel;
  currentUser;
  removeSubscribe:Subscription;
  constructor( private userService:UserService, private messag:MessagingService,
    router:Router, 
    private notificationService:NotificationService,private dialog:MatDialog) {//UserService
      try {
        this.notificationService.setNotificationMap();
      } catch (error) {
        setTimeout(()=>{router.navigate(['/user'])},1000)
      }
    
    try {
     this.removeSubscribe= UserService.userObservable.subscribe(user=>{
        this.treeUniversity=[]
        this.courses=user;
        if(user)
          if(user.univeristy)
          Object.keys(user.univeristy).forEach((universityKey:any)=>{
          let temp1:Tree[]=[];
        if(user.univeristy[universityKey].colleages)
          Object.keys(user.univeristy[universityKey].colleages).forEach((collegeKey:any)=>{
            let temp2:Tree[]=[];
        if(user.univeristy[universityKey].colleages[collegeKey].courses)
            Object.keys(user.univeristy[universityKey].colleages[collegeKey].courses).forEach(( courseKey: any) => {
              temp2.push({"name":courseKey, "link":universityKey+"/"+collegeKey+"/"+courseKey+"/post"})
            })
            temp1.push({"name":collegeKey, "children":temp2})
          })
          this.treeUniversity.push({"name":universityKey, "children":temp1})
        })
        this.dataSource.data = this.treeUniversity;
        
        this.treeControl.dataNodes = this.treeUniversity;
        this.treeControl.expandAll();
      }
    )
    this.currentUser=UserService.getUser();
    } catch (error) {
      setTimeout(()=>{router.navigate(['/user'])},1000)
    }
      
  
  }
  ngOnDestroy(): void {
    this.notificationService.dounsubscribe();
    if(this.removeSubscribe)
      this.removeSubscribe.unsubscribe();

  }
getuniversityId(link:string):string{
  if(link)
    return link.slice(0,link.indexOf("/"));
    else return ;
} 
getcoleageId(link:string):string{
  if(link){
 let temp= link.slice(link.indexOf("/")+1);
  return temp.slice(0,temp.indexOf("/"));
  }else return;
 }
  getNotification(id1:string, id2:string, id3:string){
    let notification=NotificationService.notification.get(id1+id2+id3)
    if(!notification)
      return 0;
      
    let counter=0;
    notification.categoriesNumber.forEach((value:number, key:string)=>{
      counter+=value;
    })
    if(notification.postsNumber+counter+notification.assignmentsNumber+notification.pollingsNumber)
      return notification.postsNumber+counter+notification.assignmentsNumber+notification.pollingsNumber;
  } 
  


  ngOnInit() {
    if(UserService.user.name==="")
      this.dialog.open(ChangeNameComponent,{data:this.currentUser}) 
    
  }

}
