import { Injectable } from '@angular/core';
import { Category } from './category';
import { Material } from './Material';
import { map } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';
import { BehaviorSubject, Observable } from 'rxjs';
import { OnDestroy } from '@angular/core';
import { MaterialModel } from '../models/MaterialModel.model';
import { CategoryService } from '../firebaseService/CategoryService';
import { MaterialService } from '../firebaseService/MaterialService';

@Injectable({
  providedIn: 'root'
})
export class CategoryFactoryService implements OnDestroy{

  removeUnsubscribe1;
  removeUnsubscribe2;
  private allCategories: BehaviorSubject<Category[]>=new BehaviorSubject([]);
  categories: Observable<Category[]>;
  private categoriesTemp :Category[]=[];

  private categoryService:CategoryService =new CategoryService(this.firestore);
  private materialService:MaterialService = new MaterialService(this.firestore);
  constructor(private url:string, private firestore: AngularFirestore){
      this.url+='/categories/';

      this.categories=this.getCategories();
  }
  ngOnDestroy(): void { 
      if(this.removeUnsubscribe1)  
          this.removeUnsubscribe1.unsubscribe();
      if(this.removeUnsubscribe2)  
          this.removeUnsubscribe2.unsubscribe();
  }

  
  flag:boolean=false;
  getCategories(url?:string): Observable<Category[]>{
      let categoryNames=this.categoryService.getAll(this.url).pipe(map(action=>action.map(category=>category.id)))
      
      if(this.removeUnsubscribe1)  
          this.removeUnsubscribe1.unsubscribe();

      this.removeUnsubscribe1= categoryNames.subscribe( categoryName=>{
          this.flag =false; 
           categoryName.forEach(element=>{
            if(!(this.categoriesTemp.find(x=> x.name===element))){
              this.flag=true;  
              let x=new Category(this.url, element, this.firestore)
              x.materials=this.getMaterials(element);
              this.categoriesTemp.push(x)
              }
           })
           if(this.flag){
              this.flag =false;
              this.allCategories.next(this.categoriesTemp);}
         })
      this.categories=this.allCategories.asObservable();
     return this.categories;
  }

  
  getMaterials(id:string):Observable<Material[]>{
    //console.log(this.url+'/categories/'+id+'/materials/');
  let  materialsTemp :Material[]=[];
  let materialsBehavior: BehaviorSubject<Material[]>=new BehaviorSubject([]);
  let flag:boolean=false
      this.removeUnsubscribe2=this.materialService.getAll(this.url+id+'/materials/').subscribe(
          materials=>{ 
            flag=false;
            materials.forEach(material=>{
            if(!(materialsTemp.find(x=> x.material.id===material.id))){
                materialsTemp.push(new Material(this.url, this.firestore, material))
                flag=true;
              }
             })
             if(flag)
               materialsBehavior.next(materialsTemp);
            })
          //if(materialsTemp[0])
          //console.log(materialsTemp.length)
      
      return materialsBehavior.asObservable();
  }
}
