import { Component  } from '@angular/core';

@Component({
  selector: 'app-footer',
  template: `
    <footer class="my-5 pt-5 text-muted text-center text-small">
    <hr class="container">
    <p class="mb-1">&copy; 2020-2019 FC</p>
    <ul class="list-inline">
        <li class="list-inline-item"><a href="#">Contact Us</a></li>&nbsp;&nbsp;
        <li class="list-inline-item"><a href="#">About</a></li>
    </ul>
    </footer>
  `,
  //styleUrls: ['../../../../../views/auth/sb-admin-2.min.css']
})
export class FooterComponent  {

}
