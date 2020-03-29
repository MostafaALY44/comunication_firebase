import { CRUD } from '../models/CRUD';
import { MaterialModel } from '../models/MaterialModel.model';
import { MaterialService } from '../firebaseService/MaterialService';
import { AngularFirestore } from '@angular/fire/firestore';

export class Material implements CRUD{    
    //material:MaterialModel
    private materialService:MaterialService
	constructor(private url:string, private firestore: AngularFirestore, public material:MaterialModel){
		url+="/materials/";
		this.materialService = new MaterialService(this.firestore);
	}
	create (material:MaterialModel){
        return this.materialService.create(this.url, material)
    }
	
	read (id:string){
		return this.materialService.read(this.url, id);
	}
	
	update(id:string, material:MaterialModel){
		return this.materialService.update(this.url, id, this.materialForCreateAndUbdate(material) )
	}

	delete(id:string){
		return this.materialService.delete(this.url, id);		
	}

	getAll(url:string){
		return this.materialService.getAll(url);
	}

	materialForCreateAndUbdate(material:MaterialModel){return {"date":material.date, "link":material.link}}
}