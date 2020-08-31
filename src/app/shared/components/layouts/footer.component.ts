import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-footer',
  template: `
    <!-- Footer -->
    <div style= margin-top:20px></div>
        <footer id="sticky-footer" class="py-4 bg-dark text-white-50" 
       >
          <div class="container text-center">
            <ul class="list-unstyled list-inline text-center py-2">
              <li class="list-inline-item"><a style="color:#FF6347;" (click)="redirect()" routerLink="contact-us"><b>Contact Us</b></a></li>&nbsp;&nbsp;
              <li class="list-inline-item"><a style="color:#FF6347;" (click)="redirecta()" routerLink="about"><b>About</b></a></li>&nbsp;&nbsp;
              <li class="list-inline-item"><a style="color:#FF6347;" (click)="privacyRedirect()" routerLink="privacy"><b>Privacy</b></a></li>&nbsp;&nbsp;
              <li class="list-inline-item"><a style="color:#FF6347;" (click)="termsRedirect()" routerLink="terms-and-conditions"><b>Terms</b></a></li>
            </ul>
            <small style="color:white">&copy; 2020-2019 FC</small>
          </div>
      </footer>
    <!-- Footer -->
  `,
  //styleUrls: ['../../../../../views/auth/sb-admin-2.min.css']
})
export class FooterComponent {

  constructor(private router: Router) { }

  redirect() {
    this.router.navigate(['contact-us']);

  }

  redirecta() {

    this.router.navigate(['about']);
  }

  privacyRedirect() {
    this.router.navigate(['privacy']);
  }

  termsRedirect() {
    this.router.navigate(['terms-and-conditions']);
  }

}
