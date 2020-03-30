import { CRUD } from '../models/CRUD';
import { Observable, BehaviorSubject, Subscription } from 'rxjs';
import { CategoryService } from '../firebaseService/CategoryService';
import { CategoryModel } from '../models/CategoryModel';
import { AngularFirestore } from '@angular/fire/firestore';
import { MaterialService } from '../firebaseService/MaterialService';
import { Material } from './Material';
import { element } from 'protractor';

export class Category implements CRUD{
    //materials:Observable<Material[]>;
    //categories:CategoryModel[];  
    categoriesMap = new Map<string, Material >();

    private categoryService:CategoryService =new CategoryService(this.firestore);
    constructor(private url:string,
         private firestore: AngularFirestore){
        //this.url+="/categories/";
        /*, private materialService:MaterialService
        this.materials=this.getMaterials(name);*/
    }

    changeUrl(url:string){
        this.url=url+"/categories/";
        //console.log("from change url : "+this.url)
    }

    reset(){
        this.categoriesMap.clear();
    }
	create (category:CategoryModel){
        return this.categoryService.create(this.url, category)
    }
	
	read (categoryId:string){
		return this.categoryService.read(this.url, categoryId);
	}
	
	update(id:string, category:CategoryModel){
		return this.categoryService.update(this.url, id, category )
	}

	delete(id:string){
		return this.categoryService.delete(this.url, id);		
    }
    
    getAll(){
        //console.log(this.url)
        return this.categoryService.getAll(this.url);
    }

    ngOnDestroy(): void {
		/*if(this.removeUnsubscribe1)  
			this.removeUnsubscribe1.unsubscribe();*/
    }
    
   
    // removeUnsubscribe2
    // subscribeTabsFireStore()//subscribe of materials for selected tab;
	// {
	// 	this.removeUnsubscribe2=this.getAll().subscribe(categories=> {
    //         let removeUnsubscribe2:Subscription[]=[];
    //         console.log("categories.length  "+categories.length)
    //         console.log("this.categoriesMap.keys.length "+this.categoriesMap.size)

    //         if(categories.length < this.categoriesMap.size){
    //             this.categoriesMap.forEach((value: Material, key: string) =>{
    //                 if(!categories.find(element => element.id === key))
    //                     console.log("is delete ? "+this.categoriesMap.delete(key));
    //             })
    //         }else if(categories.length > this.categoriesMap.keys.length){
    //         categories.forEach(element=>{
    //             if(!this.categoriesMap.get(element.id)){    
    //                 //console.log("url for material "+this.url+'/categories/'+category.id);
    //                 let x = new Material(this.url+'/categories/'+element.id, this.firestore);
    //                 removeUnsubscribe2.push(x.getAll().subscribe(materials=>{
    //                 //console.log("sssssssssssssssssssssssss "+category.id)
    //                 //console.log(materials);
    //                 x.allMaterials.next(materials) 
    //                 }));
    //                 this.doUnsubscribe(removeUnsubscribe2)
    //                 x.material = x.allMaterials.asObservable();
    //                 this.categoriesMap.set((element.id), x)   }})
    //         } 
    //     })
    // }
    

    // unsubscribeTabsFireStore(){
    //     if(this.removeUnsubscribe2)  
	// 		this.removeUnsubscribe2.unsubscribe();
    // }
    // private doUnsubscribe(removeUnsubscribe:Subscription[]){
    //     removeUnsubscribe.forEach(element => {
    //       setTimeout(function(){element.unsubscribe()},5000);
    //      });
    //    }

}