import { Injectable, OnDestroy } from '@angular/core';
import { Polling } from '../class/Polling';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class PollingFactoryService implements OnDestroy{


  removeUnsubscribe1;
  public coursePolling:Polling=new Polling(this.firestore) ;
  private url:string;

  constructor(private firestore: AngularFirestore) { }
  

  changeUrl(url:string){
    if(this.removeUnsubscribe1)  
      this.removeUnsubscribe1.unsubscribe();
      this.coursePolling.reset();
      this.url=url;
      this.coursePolling.changeUrl(this.url);
      this.removeUnsubscribe1=this.coursePolling.getAll().subscribe((polls)=>{this.coursePolling.polles=polls;this.coursePolling.setOptions()})
   }

   ngOnDestroy(): void {
    if(this.removeUnsubscribe1)  
          this.removeUnsubscribe1.unsubscribe();
  }
}
 