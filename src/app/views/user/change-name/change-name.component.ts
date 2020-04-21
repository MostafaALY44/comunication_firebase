import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserModule } from '../user.module';
import { User } from 'src/app/services/auth/user.model';
import { UserService } from 'src/app/services/user/oop/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-change-name',
  templateUrl: './change-name.component.html',
  styleUrls: ['./change-name.component.css']
})
export class ChangeNameComponent implements OnInit {

  updateName = new FormGroup({
    
    name : new FormControl(this.data.name,Validators.required)
    
  });

  constructor(@Inject(MAT_DIALOG_DATA) private data:User,private service: UserService,private _snackBar: MatSnackBar) { }

  ngOnInit() {
  }

  isEmpty(text:string):boolean{
    for(let i=0;i<text.length;i++)
      if(text[i] != " ")
        return false;
    return true;
  }
 
  onSubmit(){
    if(!this.isEmpty(this.updateName.value.name)){

      let data1={'name':this.updateName.value.name}

     
      //let data1=this.updateName.value.name;
      this.service.update(data1);
      this._snackBar.open(this.updateName.value.name, 'Stored Successfully', { duration: 3000, });
    }
  }

}
 