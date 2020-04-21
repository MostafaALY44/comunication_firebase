import { Injectable } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/auth";
import { Observable, of } from 'rxjs';
import 'firebase/firestore';
import * as firebase from "firebase";
import { environment } from 'src/environments/environment';
import { map, switchMap } from 'rxjs/operators';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { User } from './user.model';
import { UserService } from '../user/oop/user.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService  {
  //static user: Observable<User> ;

  //user$: Observable<User>;
  constructor(private angularFireAuth: AngularFireAuth, private firestore: AngularFirestore, private router:Router,private _snackBar: MatSnackBar) {
    //this.userData = angularFireAuth.authState;
    // Get the auth state, then fetch the Firestore user document or return null
    //console.log("XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
    UserService.userObservable = this.angularFireAuth.authState.pipe(
      switchMap(user => {
          // Logged in
        if (user) {
          return this.firestore.doc<User>(`users/${user.uid}`).valueChanges();
        } else {
          // Logged out
          return of(null);
        }
      })
    )
    UserService.setUser();


  }

   static goVerificate:boolean=false;
  /* Sign up */
  async SignUp(email: string, password: string) {
    AuthenticationService.goVerificate=true;
    const credential = await this.angularFireAuth.createUserWithEmailAndPassword(email, password); 
    return this.saveNewUserData(credential.user).then(()=>{
      firebase.auth().currentUser.sendEmailVerification();
      this.SignOut();
    });
  }

  private saveNewUserData(user) {
    // Sets user data to firestore on Sign up
    const userRef: AngularFirestoreDocument<User> = this.firestore.doc(`users/${user.uid}`);
    const data:User = { 
      uid: user.uid, 
      email: user.email, 
      emailVerified:false,
      name: user.displayName,
      type:"doctor",
      level:"2",
      contact:"",
      belong_to:"",
      background:"",
      roles: {
        other: true
      },
      universities:[{name:"Ain Shams University", id:"", colleges:[{name:"faculty of science", id:"",
      courseCodes:[{code:"",  postsNumber:0, categoriesNumber:0, assignmentsNumber:0, deletePostsNumber:0,
      deleteAssignmentNumber:0}]
    }]}],
      fcmTokens:{},
      univeristy:{}
    } 
    return userRef.set(data, { merge: true })
  }
  /*removeSubscribe;
  isEmailVerified():boolean{
    let verified:boolean=false;
    // if(this.userData){
    //   this.removeSubscribe=this.userData.subscribe(user=> { if(!!user)verified=user.emailVerified;this.doUnSubscribe()});
    // }
    console.log(this.isVerificateEmail)
    return this.isVerificateEmail;
  }*/

  /*doUnSubscribe(){
    setTimeout(() => {
      this.removeSubscribe.unsubscribe;
    }, 100);
  }*/

  /* Sign in */
  async SignIn(email: string, password: string) {
    
    const credential= await this.angularFireAuth.signInWithEmailAndPassword(email, password);
    if(!credential.user.emailVerified){
      this.SignOut();
      AuthenticationService.goVerificate=true;
        return ;
    }else AuthenticationService.goVerificate=false;
    return this.updateUserData(credential.user);
  }

  private updateUserData(user) {
    // Sets user data to firestore on login
    const userRef: AngularFirestoreDocument = this.firestore.doc(`users/${user.uid}`);
    const data = { 
      uid: user.uid, 
      email: user.email,
      emailVerified:user.emailVerified,
     // type:"doctor",
     // level:"2",
     // contact:"",
     // belong_to:"",
     // background:"",
      // roles: {
      //   other: true
      // }
    } 
    return userRef.set(data, { merge: true })
  }
  
  /* Sign out */
  SignOut() {
    this.angularFireAuth.signOut().then(() =>
    console.log("Sign out ")
    //AuthenticationService.isVerificateEmail=false
      ).catch(()=>console.log("signOut not done"));
  }  

  /*isAuthenticated(): boolean {
    return AuthenticationService.islogin
  }*/

    ///// Role-based Authorization //////

    canAddCategory_material_Assignment(user: User): boolean {
      const allowed = ['instructor']
      return this.checkAuthorization(user, allowed)
    }
  
  
    // determines if user has matching role
    private checkAuthorization(user: User, allowedRoles: string[]): boolean {
      if (!user) return false
      for (const role of allowedRoles) {
        if ( user.roles[role] ) {
          return true
        }
      }
      return false
    }

   forgotPassword(email){
    this.angularFireAuth.sendPasswordResetEmail(email).then(
  () => {
    // success, show some message
    this._snackBar.open('please check your Email to continue this process!' ,'', { duration: 5000, });
    this.router.navigate(['']);
    // console.log("send successfully !!")
    // window.alert("please check your Email to continue this process!")
  },
  err => {
    // handle errors
    // console.log("error")
    this._snackBar.open(err ,'', { duration: 5000, });
      this.router.navigate(['/auth/signup']);
  }
);
  }

} 

