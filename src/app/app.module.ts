import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';
import { AngularFireAuthModule } from "@angular/fire/auth";
import { AuthenticationService } from './services/auth/authentication.service';
import { AuthGuard } from './guards/auth.guard';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { AngularFireAuthGuard } from '@angular/fire/auth-guard';
import { NotFoundPageComponent } from './views/not-found/not-found-page/not-found-page.component';
import { AngularFireMessagingModule } from '@angular/fire/messaging';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [
    AppComponent,
    NotFoundPageComponent
    
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFontAwesomeModule,
    AngularFireMessagingModule,
    ScrollingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    AngularFirestore,
    AuthGuard,  
    AuthenticationService,
    AngularFireAuthGuard ,
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
