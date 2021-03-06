import { CRUD } from '../models/CRUD';
import { MaterialModel } from '../models/MaterialModel.model';
import { MaterialService } from '../firebaseService/MaterialService';
import { AngularFirestore } from '@angular/fire/firestore';
import { OnDestroy } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
//import { UserService } from '../user.service';

export class Material implements CRUD, OnDestroy{    

	//material: MaterialModel[];
	public material: BehaviorSubject<MaterialModel[]> = new BehaviorSubject([]);
	//private userService:UserService=new UserService(this.firestore)

	private materialService:MaterialService;
	
	constructor(private url:string, private firestore: AngularFirestore){
		this.url+="/materials";
		this.materialService = new MaterialService(this.firestore);
	}

	ngOnDestroy(): void {
		if(Material.removeUnsubscribe1)  
			Material.removeUnsubscribe1.unsubscribe();
	}

	create(material: MaterialModel) {
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

	getAll(){
		return this.materialService.getAll(this.url);
	}

	static removeUnsubscribe1;
	subscribeMaterialsFireStore()//subscribe of materials for selected tab;
	{
		
		if(Material.removeUnsubscribe1)  
			Material.removeUnsubscribe1.unsubscribe();
		Material.removeUnsubscribe1=this.getAll().subscribe(materials=> {this.material.next(materials)}) 
		return this.material.asObservable();
	}

	unsubscribe(){
		if(Material.removeUnsubscribe1)  
			Material.removeUnsubscribe1.unsubscribe();
	}
	
	materialForCreateAndUbdate(material:MaterialModel){return {"date":material.date, "link":material.link}}
}