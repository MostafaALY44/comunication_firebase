import { Component, OnInit  } from '@angular/core';
import { SearchInputService } from 'src/app/services/announcement/search-input.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { AuthenticationService } from 'src/app/services/auth/authentication.service';
import { UserService } from 'src/app/services/user/oop/user.service';
import { ChangeNameComponent } from 'src/app/views/user/change-name/change-name.component';
import { MatDialog } from '@angular/material/dialog';
import { AngularFireAuth } from '@angular/fire/auth';
import { concatAll } from 'rxjs/operators';
import { User } from 'src/app/services/auth/user.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['../../../../../views/auth/sb-admin-2.min.css']
})
export class NavComponent implements OnInit {
  currentUser:User;
  userLink:string="user";
  isAdmin:boolean=false;
  constructor(private searchService:SearchInputService, private router:Router,
     private authenticationService:AuthenticationService,private dialog:MatDialog) {
        if(this.isEqualAnnouncementsOrWelcom(this.router.url) ) 
          this.displaySearchInput=true;
        
          this.currentUser=UserService.getUser();
          //console.log(this.currentUser)
          this.isAdmin=false;
         let removeSubscribe= AuthenticationService.isAdmin.subscribe(admin=>{
            if(admin){
              this.userLink="admin";
              this.isAdmin=admin;
              setTimeout(()=>{
                removeSubscribe.unsubscribe();
              },0)
            }
          })
     };
  displaySearchInput:boolean=false;
  urlBeforeNavigate:string='';
  searchWord:string='';
  isEmailVerified(){
    return  UserService.user.emailVerified;
  }

  displayEmail():string{
    return UserService.user.email;
  }

  goVerificate():boolean{
    //console.log(AuthenticationService.goVerificate)
    return AuthenticationService.goVerificate
  }

  ngOnInit() {}
  isEqualAnnouncementsOrWelcom(url:string) :boolean{
    if(this.router.url.length ==1 && this.router.url[0]=='/')  // for welcom url
      return true;
    else if(this.router.url.length > 13){  //for announcements/ url
      if(this.router.url.slice(1,14)=="announcements")
        return true;
    }
    return false;
  }
  
  focusSearch(){
    this.searchService.isFocus=true; 
    this.router.navigate(['announcements/global']);
    this.urlBeforeNavigate=this.router.url;
  }
  
  focusoutSearch(){
    this.searchService.isFocus=false; 
    if(this.urlBeforeNavigate == this.router.url)
      this.router.navigate(['']);
    else
      this.router.navigate([this.urlBeforeNavigate]);
    this.searchService.changeSearchValue('');
    this.searchWord='';
  }

  wordSearch(event){
    this.searchService.changeSearchValue(event); 
  }

  logout(){
    this.authenticationService.SignOut();
  }
  
  changePassword(){
    // AuthenticationService.isAdmin.subscribe(admin=>{
      if(this.isAdmin)
          this.router.navigate(['admin/'+AuthenticationService.adminIdLink+'/change-admin-password']);
        
      else 
        this.router.navigate(['user/change-password']);
      

    // this.router.navigate(['user/change-password']); 
  }

  changeName(){
    this.dialog.open(ChangeNameComponent,{data:this.currentUser})
  }

}
