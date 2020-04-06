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
  ],
  providers: [
    AngularFirestore,
    AuthGuard,  
    AuthenticationService,
    AngularFireAuthGuard 
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
