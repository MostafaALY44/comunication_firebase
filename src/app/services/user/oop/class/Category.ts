import { CRUD } from '../models/CRUD';
import { Observable, BehaviorSubject } from 'rxjs';
import { CategoryService } from '../firebaseService/CategoryService';
import { CategoryModel } from '../models/CategoryModel';
import { AngularFirestore } from '@angular/fire/firestore';
import { MaterialService } from '../firebaseService/MaterialService';
import { Material } from './Material';

export class Category implements CRUD{
    materials:Observable<Material[]>;

    private categoryService:CategoryService =new CategoryService(this.firestore);
    constructor(private url:string, public name:string,
         private firestore: AngularFirestore){
        this.url+="/categories/";
        /*, private materialService:MaterialService
        this.materials=this.getMaterials(name);*/
    }
	create (category:CategoryModel){
        return this.categoryService.create(this.url, category)
    }
	
	read (){
		return this.categoryService.read(this.url, this.name);
	}
	
	update(id:string, category:CategoryModel){
		return this.categoryService.update(this.url, id, category )
	}

	delete(id:string){
		return this.categoryService.delete(this.url, id);		
    }
    
    getAll(url:string){
        return this.categoryService.getAll(url);
    }

    /*removeUnsubscribe2
    materialsTemp :Material[]=[]; 
    private materialsBehavior: BehaviorSubject<Material[]>=new BehaviorSubject([]);
    getMaterials(id:string):Observable<Material[]>{
        this.removeUnsubscribe2=this.materialService.getAll(this.url+'/'+id+'/materials/').subscribe(
            materials=> materials.forEach(material=>this.materialsTemp.push(new Material(this.url, this.firestore, material)
            )))
        this.materialsBehavior.next(this.materialsTemp);
        return this.materialsBehavior.asObservable();
    }*/

}