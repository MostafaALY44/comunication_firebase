import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { pollVotingModel } from 'src/app/services/user/oop/models/PollVotingModel';
import { CourseService } from 'src/app/services/user/oop/course.service';

@Component({
  selector: 'app-edit-option',
  templateUrl: './edit-option.component.html',
  styleUrls: ['./edit-option.component.css']
})
export class EditOptionComponent implements OnInit {

  updateOption = new FormGroup({
    option : new FormControl(this.data.text,Validators.required)
    
  });
  constructor(@Inject(MAT_DIALOG_DATA) private data:pollVotingModel) { }

  ngOnInit() {
  }

  isEmpty(text:string):boolean{
    for(let i=0;i<text.length;i++)
      if(text[i] != " ")
        return false;
    return true;
  }
  onSubmit(){
    if(!this.isEmpty(this.updateOption.value.option)){
     this.data.text=this.updateOption.value.option;
  
     CourseService.polls.votting.update(this.data.id,this.data);
    }
   
    
    }

}
