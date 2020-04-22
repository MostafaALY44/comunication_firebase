import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/auth/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-not-found-page',
  templateUrl: './not-found-page.component.html',
  styleUrls: ['./not-found-page.component.css']
})
export class NotFoundPageComponent implements OnInit {

  constructor(private router:Router) {

    let removeSubcribe=  AuthenticationService.isAdmin.subscribe(admin=>{
      if(admin){
        this.router.navigate(['admin']);
        setTimeout(()=>{
          removeSubcribe.unsubscribe();
        },0)
      }

    })
   }

  ngOnInit() {
  }

}
