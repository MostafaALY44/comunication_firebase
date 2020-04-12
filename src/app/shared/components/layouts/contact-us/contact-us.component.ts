import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user/oop/user.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ContactModel } from 'src/app/services/user/oop/models/contactModel';
import { ContactService } from 'src/app/services/user/contact.service';


@Component({
  selector: 'contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent implements OnInit {

  ContactUs = new FormGroup({
    name : new FormControl('',Validators.required),
    email : new FormControl('',Validators.required),
    message:new FormControl('',Validators.required)
  });
  currentUser;
  constructor(private service: ContactService) {
    this.currentUser=UserService.getUser();

   }

  ngOnInit() {
  }
  isEmpty(text:string):boolean{
    for(let i=0;i<text.length;i++)
      if(text[i] != " ")
        return false;
    return true;
  }

  onSubmit(){
    if(!this.isEmpty(this.ContactUs.value.name)){
      if(this.currentUser.uid){
          let data:ContactModel={"personId" : this.currentUser.uid, "name" :this.ContactUs.value.name,"email" :this.ContactUs.value.email, "message":this.ContactUs.value.message};
      
      this.service.addContact(data);
      this.ContactUs.reset();
    }else {

      let data:ContactModel={ "name" :this.ContactUs.value.name,"email" :this.ContactUs.value.email, "message":this.ContactUs.value.message};
      
      this.service.addContact(data);
      this.ContactUs.reset();
    }

    } 
  }


}
