import { Component, OnInit  } from '@angular/core';
import { SearchInputService } from 'src/app/services/announcement/search-input.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { AuthenticationService } from 'src/app/services/auth/authentication.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['../../../../../views/auth/sb-admin-2.min.css']
})
export class NavComponent implements OnInit {
  constructor(private searchService:SearchInputService, private router:Router,
     private authenticationService:AuthenticationService) {
        if(this.isEqualAnnouncementsOrWelcom(this.router.url) )
          this.displaySearchInput=true;
       
     };
  displaySearchInput:boolean=false;
  urlBeforeNavigate:string='';
  searchWord:string='';
  ngOnInit() {
  }
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

}
