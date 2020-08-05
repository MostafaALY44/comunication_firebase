import { Component, OnInit, HostListener } from '@angular/core';
import { CreatePersonFormComponent } from './create-person-form/create-person-form.component';
import { AddPersonService } from '../../service/add-person.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Roles } from 'src/app/services/auth/user.model';
import { MatDialog } from '@angular/material/dialog';
import { SavePersonsDataComponent } from '../save-persons-data/save-persons-data.component';
import * as XLSX from 'xlsx';
import { templateJitUrl } from '@angular/compiler';
@Component({
  selector: 'app-create-persons',
  templateUrl: './create-persons.component.html',
  styleUrls: ['./create-persons.component.css']
})
export class CreatePersonsComponent implements OnInit {
  idUniversity;
  idCollege;
  constructor(private addPersonService:AddPersonService,  private router:ActivatedRoute,
    private dialog:MatDialog) {
      CreatePersonFormComponent.reset();

      this.router.parent.paramMap.subscribe((params: ParamMap)=>{
        this.idUniversity=params.get('id1')
        this.idCollege=params.get('id2')
      }).unsubscribe();
     }

  ngOnInit() {
  }

  createPersonComponents:boolean[]=[false];
  pointerToLastIndex:number=0;
  
  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    
   
   if(event.key == "Shift"){
     if(this.canAddNewForm){
      this.createPersonComponents[this.createPersonComponents.length-1]=true;
      this.createPersonComponents.push(false)
      this.pointerToLastIndex=this.createPersonComponents.length-1;
      this.canAddNewForm=false;
      }
    }else if(event.key == "Enter"){
      if(this.canAddNewForm)
      this.onSubmit();
    }
  }

  getFormObj(i:number){
    if(CreatePersonFormComponent.allPersons.length > i)
      return CreatePersonFormComponent.allPersons[i]
    let dumy:string[]=[]
    return {email:"", courses:dumy, "roles":null};  
  }

  isEmail(email):boolean{
    if(!email)
      return false;
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  removed:Map<number,boolean>=new Map<number, boolean>();
  remove(removeElement:boolean, index:number){
    if(removeElement){
      this.removed.set(index, true);
  
      if(index== this.pointerToLastIndex){
        this.pointerToLastIndex=0;
        this.removed.forEach((value:boolean, key:number)=>{
          if(this.pointerToLastIndex < key && !value)
            this.pointerToLastIndex=key;
        })
        let flag=true;
        for (let index = 0; index < CreatePersonFormComponent.allPersons.length; index++) {
          if( !this.isEmail(CreatePersonFormComponent.allPersons[index].obj.email) 
              || !CreatePersonFormComponent.allPersons[index].obj.courses.length)
          {
            flag=false;
            break;
          }
        }
        if(flag){
          this.canAddNewForm=true;
        }
        
      }
    }
    //this.createPersonComponents.splice(index,1);
  }

  trackByCreatePerson(index){
    this.createPersonComponents=[false]
    return (index < (this.createPersonComponents.length-1))? index:undefined
  }

  canAddNewForm:boolean=false;
  isformDataDone(isDone:boolean, index:number){
    this.canAddNewForm=isDone;
  }

  onSubmit(){
    let x = CreatePersonFormComponent.allPersons
    
    let ref = this.dialog.open(SavePersonsDataComponent,
      {data:{paramMap:this.router.parent.paramMap , mapCourses:CreatePersonFormComponent.allPersonCourses,
        persons:CreatePersonFormComponent.allPersons}, height: '600px', width: '900px', disableClose: true})
    let removeSubscribe1=ref.afterClosed().subscribe((ss)=>{
      
      if(ss.isAdd){
        console.log(ss)
        CreatePersonFormComponent.reset();
          this.createPersonComponents=[];
          
         this.pointerToLastIndex=0;
        this.removed.clear();
        this.canAddNewForm=true;
        
      }else
        ss.data.forEach(element => {
          this.remove(true, element)
        });
       setTimeout(()=>{removeSubscribe1.unsubscribe},0)
    })
    
    
    
  }

//   arrayBuffer:any;
// file:File;
// incomingfile(event) 
//   {
//   this.file= event.target.files[0]; 
//   }

//  Upload() {
//       let fileReader = new FileReader();
//         fileReader.onload = (e) => {
//             this.arrayBuffer = fileReader.result;
//             var data = new Uint8Array(this.arrayBuffer);
//             var arr = new Array();
//             for(var i = 0; i != data.length; ++i) arr[i] = String.fromCharCode(data[i]);
//             var bstr = arr.join("");
//             var workbook = XLSX.read(bstr, {type:"binary"});
//             var first_sheet_name = workbook.SheetNames[0];
//             var worksheet = workbook.Sheets[first_sheet_name];
//             console.log(XLSX.utils.sheet_to_json(worksheet,{raw:true}));
//         }
//         fileReader.readAsArrayBuffer(this.file);
        
// }
exceltoJson = {};

  onFileChange(event: any) {
    this.exceltoJson = {};
    let headerJson = {};
    /* wire up file reader */
    const target: DataTransfer = <DataTransfer>(event.target);
    // if (target.files.length !== 1) {
    //   throw new Error('Cannot use multiple files');
    // }
    const reader: FileReader = new FileReader();
    reader.readAsBinaryString(target.files[0]);
    //console.log("filename", target.files[0].name);
    this.exceltoJson['filename'] = target.files[0].name;
    reader.onload = (e: any) => {
      /* create workbook */
      const binarystr: string = e.target.result;
      const wb: XLSX.WorkBook = XLSX.read(binarystr, { type: 'binary' });
      // console.log(wb.SheetNames,"    ", wb.Sheets)
      for (var i = 0; i < wb.SheetNames.length; ++i) {
        const wsname: string = wb.SheetNames[i];
        const ws: XLSX.WorkSheet = wb.Sheets[wsname];
        const data = XLSX.utils.sheet_to_json(ws); // to get 2d array pass 2nd parameter as object {header: 1}
        this.exceltoJson[`sheet${i + 1}`] = data;
        // console.log(data);
        const headers = this.get_header_row(ws);
        headerJson[`header${i + 1}`] = headers;
        //  console.log("json",headers)
        // console.log(this.exceltoJson[`sheet${i + 1}`])
        for (let index = 0; index < this.exceltoJson[`sheet${i + 1}`].length; index++) {
        // console.log(this.exceltoJson[`sheet${i + 1}`][index])
           this.exceltoJson[`sheet${i + 1}`][index]['courses']=this.splitCourses(this.exceltoJson[`sheet${i + 1}`][index]['courses'])
        }
      }
      this.exceltoJson['headers'] = headerJson;
      
      
      console.log(this.exceltoJson);
    };
    
  }

  get_header_row(sheet) {
    var headers = [];
    var range = XLSX.utils.decode_range(sheet['!ref']);
    var C, R = range.s.r; /* start in the first row */
    /* walk every column in the range */
    for (C = range.s.c; C <= range.e.c; ++C) {
      var cell = sheet[XLSX.utils.encode_cell({ c: C, r: R })] /* find the cell in the first row */
      // console.log("cell",cell)
      var hdr = "UNKNOWN " + C; // <-- replace with your desired default 
      if (cell && cell.t) {
        hdr = XLSX.utils.format_cell(cell);
        headers.push(hdr);
      }
    }
    return headers;
  }

  splitCourses(obj:string){
   let temp:string[]=[];
   let course:string="";
  //  console.log(obj)
      for (let index = 0; index < obj.length; index++) {
        if(obj[index]!== ","){
          if(obj[index]!== " "){
            course+=obj[index];
          }
        }else{
            temp.push(course);
            course="";
        }

      }
      temp.push(course);
      // console.log(temp)
      return temp;
  }
  onAdd(){
    
    // for (let index = 0; index < this.exceltoJson['filename'].length; index++) {
      // console.log( this.exceltoJson[`sheet${index + 1}`],index + 1)
      for (let i = 0; i < this.exceltoJson['sheet1'].length; i++) {
        let obj={"link":{"idUniversity":this.idUniversity,
              "idCollege":this.idCollege},
              "persons":this.exceltoJson[`sheet${i + 1}`]
            };
            console.log(obj)
            this.addPersonService.addPersons(obj)
          // }
    }
    
    
  }
}
