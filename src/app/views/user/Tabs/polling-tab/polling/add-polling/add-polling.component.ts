import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, Validators, FormGroup } from '@angular/forms';
import { PollingModel } from 'src/app/services/user/oop/models/PollingModel';
import { UserService } from 'src/app/services/user/oop/user.service';
import { CourseService } from 'src/app/services/user/oop/course.service';
import { pollVotingModel } from 'src/app/services/user/oop/models/PollVotingModel';
import { DocumentReference } from '@angular/fire/firestore/interfaces';

@Component({
  selector: 'add-polling',
  templateUrl: './add-polling.component.html',
  styleUrls: ['./add-polling.component.css']
})
export class AddPollingComponent implements OnInit {

  myForm:FormGroup;
  currentUser;
  constructor(private fb:FormBuilder ) { 
    this.currentUser=UserService.getUser();
    
  }

  
  ngOnInit() {

    this.myForm = this.fb.group({
      poll:new FormControl('',Validators.required),
      deadLine:new FormControl(''),
      options: this.fb.array([])
    }) 
  
  }

  isEmpty(text:string):boolean{
    for(let i=0;i<text.length;i++)
      if(text[i] != " ")
        return false;
    return true;
  }
  
  get optionForms() {
    return this.myForm.get('options') as FormArray
  }
  
  addOption() {
  
    const option = this.fb.group({ 
      text:new FormControl('',Validators.required)
    })
  
    this.optionForms.push(option);
  }
  deleteId;
  deleteOption(i) {
    this.deleteId=i;
    this.optionForms.removeAt(i)
  }
  resetForm(form) {

    form.reset();

    Object.keys(form.controls).forEach(key => {
      form.get(key).setErrors(null) ;
    });
}
  onSubmit(){
   
    if(!this.isEmpty(this.myForm.value.poll) && this.myForm.value.options.length ){
      let data1:pollVotingModel;
      let data:PollingModel={'id':"",'text' : this.myForm.value.poll, 'deadLine' : this.myForm.value.deadLine,'pollingOwner':this.currentUser.name,'userId':this.currentUser.uid};
     
      CourseService.polls.create(data).then(docRef=>{
        
        
        let lastOption:Promise<DocumentReference>
        for(let i=0;i<this.myForm.value.options.length;i++){
          data1={'id':"",'text':this.myForm.value.options[i].text, 'vottedPerson':[],'votes':0}
         
        
          CourseService.polls.votting.setCurrentIdPoll(docRef.id);
          lastOption=CourseService.polls.votting.create(data1);
          if(i == this.myForm.value.options.length-1){
            setTimeout(()=>{
              lastOption.then(()=>{
                this.optionForms.clear();
                this.resetForm(this.myForm)
              })
            },0)
          }
       
      }  
      });
    

    
     
    } 
    
   
  }

}

