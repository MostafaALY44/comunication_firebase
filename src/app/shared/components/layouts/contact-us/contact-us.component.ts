import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user/oop/user.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ContactModel } from 'src/app/services/user/oop/models/contactModel';
import { ContactService } from 'src/app/services/user/contact.service';
import { RegistrationContactService } from 'src/app/services/user/registration-contact.service';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent implements OnInit {
  
  ContactUs = new FormGroup({
    name : new FormControl('',Validators.required),
    email : new FormControl('',Validators.required),
    message:new FormControl('',Validators.required),
    type:new FormControl('',Validators.required)
  });
  currentUser;
  constructor(private _snackBar: MatSnackBar,private Problemservice: ContactService, private Registrationservice: RegistrationContactService) {
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
  resetForm(form: FormGroup) {

    form.reset();

    Object.keys(form.controls).forEach(key => {
      form.get(key).setErrors(null) ;
    });
}
  onSubmit(){
    if(!this.isEmpty(this.ContactUs.value.name)){
      if(this.currentUser.uid){
          let data:ContactModel={"personId" : this.currentUser.uid, "name" :this.ContactUs.value.name,"email" :this.ContactUs.value.email, "message":this.ContactUs.value.message};
        if(this.ContactUs.value.type==="1"){
          this.Problemservice.addContact(data).then(()=>{
            this._snackBar.open('Your message' , 'sent Successfully', { duration: 3000, });
          })
          this.resetForm(this.ContactUs);
        }
      else if(this.ContactUs.value.type==="2"){
        this.Registrationservice.addContact(data).then(()=>{
          this._snackBar.open('Your message' , 'sent Successfully', { duration: 3000, });
        })
        this.resetForm(this.ContactUs);
      }
    }else {

      let data:ContactModel={ "name" :this.ContactUs.value.name,"email" :this.ContactUs.value.email, "message":this.ContactUs.value.message};
      
      if(this.ContactUs.value.type==="1"){
        this.Problemservice.addContact(data).then(()=>{
          this._snackBar.open('Your message' , 'sent Successfully', { duration: 3000, });
        })
        this.resetForm(this.ContactUs);}
    else if(this.ContactUs.value.type==="2"){
      this.Registrationservice.addContact(data).then(()=>{
        this._snackBar.open('Your message' , 'sent Successfully', { duration: 3000, });
      })
      this.resetForm(this.ContactUs);
    }
    }

    } 
  }


}
