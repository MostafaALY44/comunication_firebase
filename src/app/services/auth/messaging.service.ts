import { Injectable, OnDestroy } from '@angular/core';
import { AngularFireMessaging } from '@angular/fire/messaging';
import { UserService } from '../user/oop/user.service';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from "firebase";

@Injectable({
  providedIn: 'root'
})
export class MessagingService implements OnDestroy{

  removeSubscribe1;removeSubscribe2;
  constructor(private afMessaging: AngularFireMessaging, private angularFirestore:AngularFirestore) { 
    this.removeSubscribe1=this.afMessaging.requestToken .subscribe(
      (token) => { this.saveToken(token) },
      (error) => {  },  
    );
    this.receiveMessages();
    
  }
  ngOnDestroy(): void {
    if(this.removeSubscribe1)
      this.removeSubscribe1.unsubscribe();
    if(this.removeSubscribe2)
      this.removeSubscribe2.unsubscribe();
  }
  receiveMessages() {
    firebase.messaging().onMessage(payload => { 
   });
  }
   listen(){
     this.receiveMessages();
   this.removeSubscribe2=this.afMessaging.messages
    .subscribe((message) => {  });

  }

   // save the permission token in firestore
   private saveToken( token): void {
    
    const currentTokens = UserService.user.fcmTokens || { }

    // If token does not exist in firestore, update db
    if (!currentTokens[token]) {
      const userRef = this.angularFirestore.collection('users').doc(UserService.user.uid)
      const tokens = { ...currentTokens, [token]: true }
      userRef.update({ fcmTokens: tokens })
    }
}

}
