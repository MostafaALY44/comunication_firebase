import { Injectable } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/auth";
import { Observable, of } from 'rxjs';
import 'firebase/firestore';
import * as firebase from "firebase";
import { environment } from 'src/environments/environment';
import { map, switchMap } from 'rxjs/operators';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { User } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService  {
  userData: Observable<User> | null;

  user$: Observable<User>;
  constructor(private angularFireAuth: AngularFireAuth, private firestore: AngularFirestore) {
    //this.userData = angularFireAuth.authState;
    // Get the auth state, then fetch the Firestore user document or return null
    this.userData = this.angularFireAuth.authState.pipe(
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
  }

  isVerificateEmail:boolean=false;
  /* Sign up */
  async SignUp(email: string, password: string) {
    const credential = await this.angularFireAuth.createUserWithEmailAndPassword(email, password)
    return this.saveNewUserData(credential.user).then(()=>
      firebase.auth().currentUser.sendEmailVerification()
    );
  }

  private saveNewUserData(user) {
    // Sets user data to firestore on Sign up
    const userRef: AngularFirestoreDocument<User> = this.firestore.doc(`users/${user.uid}`);
    const data:User = { 
      uid: user.uid, 
      email: user.email, 
      name: user.displayName,
      type:"doctor",
      level:"2",
      contact:"",
      belong_to:"",
      background:"",
      roles: {
        other: true
      }
    } 
    return userRef.set(data, { merge: true })
  }
  isEmailVerified():boolean{
    console.log(this.isVerificateEmail)
    return this.isVerificateEmail
  }

  /* Sign in */
  async SignIn(email: string, password: string) {
    const credential= await this.angularFireAuth.signInWithEmailAndPassword(email, password);
    console.log("+++ : "+credential.user.emailVerified)
    this.isVerificateEmail=credential.user.emailVerified;
    return this.updateUserData(credential.user);
  }

  private updateUserData(user) {
    // Sets user data to firestore on login
    const userRef: AngularFirestoreDocument = this.firestore.doc(`users/${user.uid}`);

    const data = { 
      uid: user.uid, 
      email: user.email,
      type:"doctor",
      level:"2",
      contact:"",
      belong_to:"",
      background:"",
      roles: {
        other: true
      }
    } 
    return userRef.set(data, { merge: true })
  }
  
  /* Sign out */
  SignOut() {
    this.angularFireAuth.signOut().then(() =>
      console.log("signOut done")
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
  

}

