import { Injectable } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/auth";
import { Observable, of, BehaviorSubject } from 'rxjs';
import 'firebase/firestore';
import * as firebase from "firebase";
import { environment } from 'src/environments/environment';
import { map, switchMap } from 'rxjs/operators';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { User } from './user.model';
import { UserService } from '../user/oop/user.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CourseService } from '../user/oop/course.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService  {
  //static user: Observable<User> ;
static isAdmin:BehaviorSubject<boolean>=new BehaviorSubject(false);
static isUser:boolean=false;
static currentAdminLink:string="";
static adminIdLink:string="";

  //user$: Observable<User>;
  constructor(private angularFireAuth: AngularFireAuth, private firestore: AngularFirestore, private router:Router,private _snackBar: MatSnackBar) {
    
    UserService.userObservable=of(null);
    let temp = this.angularFireAuth.authState.pipe(
      switchMap(user => {
          // Logged in
          AuthenticationService.isAdmin.next(false);
          AuthenticationService.adminIdLink="";
        if (user) {
           setTimeout(()=>{
              user.getIdTokenResult().then((idTokenResult)=>{
                if(idTokenResult.claims.admin)
                  setTimeout(()=>{
                    
                    AuthenticationService.adminIdLink=idTokenResult.claims.idUniversity+"/"+idTokenResult.claims.idCollege;
                     UserService.userObservable =  of(null)
                   AuthenticationService.isAdmin.next(true);
                    //UserService.setUser();
                    
                  },0)
              })
            }, 0)
    
         UserService.userObservable= this.firestore.doc<User>(`users/${user.uid}`).valueChanges();
        } else {
          // Logged out
          UserService.userObservable=of(null);
         // return of(null);
        }
        return UserService.userObservable;
      })
      
    )
    
    
     UserService.userObservable=temp;
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
      deleteAssignmentNumber:0,description:""}]
    }]}],
      fcmTokens:{},
      univeristy:{}
    } 
    return userRef.set(data, { merge: true })
  }
  

  /* Sign in */
  async SignIn(email: string, password: string) { 
    const credential= await this.angularFireAuth.signInWithEmailAndPassword(email, password);
    if(!credential.user.emailVerified){
      firebase.auth().currentUser.sendEmailVerification();
      this.SignOut();
      AuthenticationService.goVerificate=true;
        return ;
    }else AuthenticationService.goVerificate=false;
    
    AuthenticationService.isUser=false;
    if((await credential.user.getIdTokenResult()).claims.admin){
      setTimeout(()=>{
        //UserService.setUser();
        this.router.navigate(['admin']);
      },2000)
      
    }else{
      AuthenticationService.isUser=true;
      this.router.navigate(['user']);
    }

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
    AuthenticationService.isAdmin.asObservable().subscribe(admin=>{
      if(!admin)
        CourseService.removeSub.next(true);
    }).unsubscribe();
    
    this.angularFireAuth.signOut();
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
    
  },
  err => {
    
    this._snackBar.open(err ,'', { duration: 5000, });
      this.router.navigate(['/auth/signup']);
  }
);
  }

} 

