import { Injectable, OnDestroy } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument  } from '@angular/fire/firestore';
import 'firebase/firestore';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class MaterialsService implements OnDestroy {
 
  constructor(private firestore: AngularFirestore) {
    
   }
   removeUnsubscribe;
  ngOnDestroy(): void {
    this.removeUnsubscribe.unsubscribe();
  }

  
}
