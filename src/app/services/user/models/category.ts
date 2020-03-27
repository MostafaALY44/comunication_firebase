import { Observable, BehaviorSubject } from "rxjs";
import 'firebase/firestore';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';

export class Category{
  materials:Observable<Material[]>;
  private materialsBehavior: BehaviorSubject<Material[]>=new BehaviorSubject([]);
	constructor(private url:string, public name:string, private firestore: AngularFirestore){
    this.removeUnsubscribe=this.getMaterials().subscribe(
      materials=>{ this.materialsBehavior.next(materials);
        this.materials= this.materialsBehavior.asObservable();
      });
  }
	private getMaterials():Observable<Material[]>{console.log("getMaterials():Observable<Material[]>")
		return this.firestore.collection<Material>(this.url+'/'+this.name+'/materials').snapshotChanges().pipe(
            map(actions => actions.map(a => {
              const data = a.payload.doc.data() ;
              const id = a.payload.doc.id;
              return { id, ...data };
            }))
          );
    }
    
    setMaterial(material:Material){
        return this.firestore.collection(this.url+'/categories'+this.name+'/materials/')
          .doc(material.id)
          .set( {"date":material.date, "link":material.link})
    }

    removeUnsubscribe;
    ngOnDestroy(): void {
      console.log("this.removeUnsubscribe.unsubscribe() will run ");
      this.removeUnsubscribe.unsubscribe();
    }
}