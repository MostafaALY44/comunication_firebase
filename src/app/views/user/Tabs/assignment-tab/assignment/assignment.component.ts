import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user/oop/user.service';
import { NotificationService } from 'src/app/services/user/oop/notification.service';

@Component({
  selector: 'app-assignment',
  templateUrl: './assignment.component.html',
  styleUrls: ['./assignment.component.css']
})
export class AssignmentComponent implements OnInit {

  constructor(private userService:UserService) { }

  ngOnInit() {
  }

}
