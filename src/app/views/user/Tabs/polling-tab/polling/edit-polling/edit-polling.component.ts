import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PollingModel } from 'src/app/services/user/oop/models/PollingModel';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CourseService } from 'src/app/services/user/oop/course.service';

@Component({
  selector: 'app-edit-polling',
  templateUrl: './edit-polling.component.html',
  styleUrls: ['./edit-polling.component.css']
})
export class EditPollingComponent implements OnInit {

  updatePoll = new FormGroup({
    poll : new FormControl(this.data.text,Validators.required),
    deadLine:new FormControl(this.data.deadLine)
  });
  constructor(@Inject(MAT_DIALOG_DATA) private data:PollingModel) { }

  ngOnInit() {
  }

  isEmpty(text:string):boolean{
    for(let i=0;i<text.length;i++)
      if(text[i] != " ")
        return false;
    return true;
  }
 
  onSubmit(){
    if(!this.isEmpty(this.updatePoll.value.poll)){
     this.data.text=this.updatePoll.value.poll;
     this.data.deadLine=this.updatePoll.value.deadLine;

     CourseService.polls.update(this.data.id,this.data);
    }
   
    
    }
 
}
