import { CRUD } from '../models/CRUD';
import { CategoryService } from '../firebaseService/CategoryService';
import { CategoryModel } from '../models/CategoryModel';
import { AngularFirestore } from '@angular/fire/firestore';
import { Material } from './Material';

export class Category implements CRUD {
    categoriesMap = new Map<string, {id:string, material:Material}>();


    private categoryService: CategoryService = new CategoryService(this.firestore);
    private url: string;
    constructor(private firestore: AngularFirestore) {}

    changeUrl(url: string) {
        this.url = url + "/categories";
    }

    reset() {
        this.categoriesMap.clear();
    }

    getAll() {
        return this.categoryService.getAll(this.url);
    }

    //CRUD///////////////////////////////////
    create(category: CategoryModel) {
        return this.categoryService.create(this.url, category)
    }
    read(categoryId: string) {
        return this.categoryService.read(this.url, categoryId);
    }
    update(id: string, category: CategoryModel) {
        return this.categoryService.update(this.url, id, category)
    }
    
    delete(id: string) {
        return this.categoryService.delete(this.url, id);
    }
    //////////////////////////////////////////

    ngOnDestroy(): void {

    }
}