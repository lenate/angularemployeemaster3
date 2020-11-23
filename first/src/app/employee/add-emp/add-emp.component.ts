import { Component, Input, OnInit } from '@angular/core';
import { CommunicateService } from 'src/app/communicate.service';
@Component({
  selector: 'app-add-emp',
  templateUrl: './add-emp.component.html',
  styleUrls: ['./add-emp.component.css']
})
export class AddEmpComponent implements OnInit {

  constructor(private service:CommunicateService) { }

  @Input() emp:any;
  EmployeeId:string;
  EmployeeName:string;
  Address:string;
  Phone:number;
  Email:string;
  PhotoFileName:string;
  PhotoFilePath:string;
  


  ngOnInit(): void {
    this.EmployeeId=this.emp.EmployeeId;
    this.EmployeeName=this.emp.EmployeeName;
    this.Address=this.emp.Address;
    this.Phone=this.emp.Phone;
    this.Email=this.emp.Email;
    this.PhotoFileName=this.emp.PhotoFileName;
    this.PhotoFilePath=this.service.PhotoUrl+this.emp.PhotoFilePath;
    
  }

  addEmployee(){
    var val = {EmployeeId:this.EmployeeId,
                EmployeeName:this.EmployeeName,
                Address:this.Address,
                Phone:this.Phone,
                Email:this.Email,
                PhotoFileName:this.PhotoFileName};

    this.service.addEmployee(val).subscribe(res=>{
      alert(res.toString());
    });
  }
  
  uploadPhoto(event){
    var file=event.target.files[0];
    const formData:FormData=new FormData();
    formData.append('uploadedFile',file,file.name);

    this.service.UploadPhoto(formData).subscribe((data:any)=>{
      this.PhotoFileName=data.toString();
      this.PhotoFilePath=this.service.PhotoUrl+this.PhotoFileName;
    })
  }
  
}
