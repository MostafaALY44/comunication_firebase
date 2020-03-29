import { Model } from './model'

export interface CRUD{
    create(object:Model);
	read(id:string);
	update(id:string, object:Model);
	delete(id:string);

}