import { Component, OnInit, ViewChild } from '@angular/core';

import { Observable } from 'rxjs';
import { UserService } from 'src/app/services/user/oop/user.service';
import { User } from 'src/app/services/auth/user.model';
import { MessagingService } from 'src/app/services/auth/messaging.service';
import { CourseService } from 'src/app/services/user/oop/course.service';
import { NotificationModel } from 'src/app/services/user/oop/models/CourseMode';
import { NotificationService } from 'src/app/services/user/oop/notification.service';
import { NestedTreeControl } from '@angular/cdk/tree';
import { MatTreeNestedDataSource } from '@angular/material/tree';

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
export class UserBodyComponent implements OnInit { 
  treeControl = new NestedTreeControl<Tree>(node => node.children);
  dataSource = new MatTreeNestedDataSource<Tree>();
  hasChild = (_: number, node: Tree) => !!node.children && node.children.length > 0;

  @ViewChild('tree', {static:false}) tree;
  treeUniversity:Tree[]=[]
  courses : User;
  notification: NotificationModel;
  constructor( private userService:UserService, private messag:MessagingService, 
    private notificationService:NotificationService) {//UserService

    this.notificationService.setNotificationMap();
    
      UserService.userObservable.subscribe(user=>{
        this.treeUniversity=[]
        this.courses=user;
        Object.keys(user.univeristy).forEach((universityKey:any)=>{
          let temp1:Tree[]=[];
          Object.keys(user.univeristy[universityKey].colleages).forEach((collegeKey:any)=>{
            let temp2:Tree[]=[];
            Object.keys(user.univeristy[universityKey].colleages[collegeKey].courses).forEach(( courseKey: any) => {
              temp2.push({"name":courseKey, "link":universityKey+"/"+collegeKey+"/"+courseKey+"/post"})
              temp2.push({"name":courseKey, "link":universityKey+"/"+collegeKey+"/"+courseKey+"/material"})
              temp2.push({"name":courseKey, "link":universityKey+"/"+collegeKey+"/"+courseKey+"/assingment"})
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
    
  }

  getNotification(id1:string, id2:string, id3:string){
    let notification=NotificationService.notification.get(id1+id2+id3)
    if(!notification)
      return ;
      //console.log("notification ", notification)
    //return notification.postsNumber+notification.categoriesNumber+notification.assignmentsNumber;
    let counter=0;
    notification.categoriesNumber.forEach((value:number, key:string)=>{
      counter+=value;
    })
    return notification.postsNumber+counter+notification.assignmentsNumber;
  } 
  


  ngOnInit() {
    
  }

}
