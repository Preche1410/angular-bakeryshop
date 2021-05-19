import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,Validators } from '@angular/forms';
import { Employee } from './employee';
import { EmployeeService } from './employee.service';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss']
})
export class EmployeesComponent implements OnInit {

  form: FormGroup;

  //creat alist to hold employess
  employees:Employee[]=[];
  // create a property for image data
  avatarData;

  constructor(private employeeService: EmployeeService,
              private fb: FormBuilder) {
  }

  ngOnInit() {
    this.initForm();
    //populate the employees with data from api
    this.employeeService.getEmployees()
    .subscribe(res=>
      {

        // jion the firstname and lastname
        this.employees=res.data.map(e=>{
          e.name=`${e.first_name}  ${e.last_name}`
          return e
        }); 
      
      }
       );

  }

  private initForm(): void {
    //add the required validators
    this.form = this.fb.group({ 
      id: ['',[Validators.required,Validators.min(1)]],
      name: ['',[Validators.required,Validators.pattern('^[A-Za-z]+$')]],
      email: ['',[Validators.required,Validators.email]],
      avatar:['',[Validators.required]]
    });
  }

  addEmployee(): void {
    // Add an employee to the table
    //check form validity
    Object.keys(this.form.controls).forEach(field => {
      const control = this.form.get(field);
      control.updateValueAndValidity();

});
 if(this.form.valid){
  let exists=false;
  this.employees.forEach(e=>{
    if(e.id == this.form.value.id)
    exists=true
  })
// reject duplicate ids
  if(!exists){
     this.employees.push({...this.form.value , avatar:this.avatarData});
  } 
  

 }

  
 
    

  }


  deleteEmployee(employee): void {

    this.employees=this.employees.filter(e=>e.id !==employee.id)
   
  }
  upload(event):void{
   //load the data for the selected image
    let reader = new FileReader();
           let url= reader.readAsDataURL(event.srcElement.files[0]);
            console.log(url)
          let setUrl=(data)=>{
            this.avatarData=data
           
          }
            reader.onload = function() {
              setUrl(reader.result);
            
            }
   

  }




  isValidInput(fieldName): boolean {
    // check form controls validity
    return this.form.controls[fieldName].invalid &&
      (this.form.controls[fieldName].dirty || this.form.controls[fieldName].touched);
  }
}
