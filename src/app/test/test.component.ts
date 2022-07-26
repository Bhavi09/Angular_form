import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, UntypedFormArray , NgForm} from '@angular/forms';
import { concatAll } from 'rxjs';

@Component({
  selector: 'app-test',
  template: `
  <div>
  <form class="text-center" #userForm ="ngForm" (ngSubmit)="completeLogin(userForm)">
  <p></p>
  <div *ngIf = "co" class="m-auto " style="">
  <div class="form-group m-auto col-md-4 ">
    <input #name required #named="ngModel" class="form-control" placeholder="Enter Your name" name="Username" ngModel>
  </div>
  <small *ngIf ="named.invalid && named.touched" style="color:red;" >Please enter a valid name </small>
  <p></p>
  <div class="form-group m-auto col-md-4 mg-2 col-md-offset-4" id="phone">
    <input #phone type = "tel" pattern="[0-9]{10}" required #phoned="ngModel" class="form-control" placeholder="Phone Number" name ="Phoneno" ngModel>
    <small *ngIf ="phoned.invalid && phoned.touched" style="color:red;" >Please enter a valid mobile number</small>
    </div>

  <p></p>
        <div class="form-group m-auto col-md-4 mg-2 col-md-offset-4" id="email">
          <input type = "email" email #email class="form-control" required #emailed="ngModel" placeholder="Email" name="emailid" ngModel>
          <small *ngIf ="emailed.invalid && emailed.touched" style="color:red;" >Please enter a valid email address</small>
        </div> 
  <p></p>
        <div class="col-md-12 text-center">
            <button type="submit" [disabled]="userForm.invalid" (click)="call(name.value,phone.value,email.value);fireEvent(name.value)" class="btn btn-success mr-3">Submit</button>
            <button type="submit" (click)="show2()" class="btn btn-primary mr-3">Show</button>
            <button type="submit" (click)="update(name.value,email.value,phone.value)" class="btn btn-warning mr-3">Update</button>
            <button type="submit" (click)="Delete(name.value)" class="btn btn-danger mr-3">Delete</button>
        </div>    
  </div>
  
</form>
<p></p>
<div id="cl">
<div id="addtable">
</div>    
</div>
  `,
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {

  co = true;
  @Output() public childEvent = new EventEmitter();
  @Output() public secondEvent = new EventEmitter();
  session:any;
  check = true;
  ar:any=[];
  ch:any;
  sh = true;
  sh2= true;
  constructor() { }

    ngOnInit(): void {
      if(localStorage.getItem("session")!==null)
      {
        console.log(localStorage.getItem("session"));
        this.check = false;
      }
    }
  
  
  //********************************** CALL FUNCTION ********************************* 
  
  call(name:any,phone:any,email:any){
    if(this.check==true)
    {
    let data = {Name:name,Phone:phone,Email:email};
    this.ar.push(data);
    localStorage.setItem("session",JSON.stringify(this.ar));  
    this.check=false;
  }
  else{
    let data1 = localStorage.getItem("session")!;
    console.log(data1);
    this.ar = JSON.parse(data1);
    let data = {Name:name,Phone:phone,Email:email};
    this.ar.push(data);
    localStorage.setItem("session",JSON.stringify(this.ar));
    this.sh==true;
    this.show2();
    this.Clear(); 
  }
  }


  fireEvent(name:string){
    this.childEvent.emit(name + " form is submitted!!");
    this.secondEvent.emit(true);
  }




//   show()
//   {
//     if(this.sh==true)
//     {
//     let data1 = localStorage.getItem("session")!;
//     let data2 = JSON.parse(data1);
//     for(let i=0; i<data2.length; i++)
//     {
//       const el = document.createElement('a');
//     el.innerHTML = "<div class='card'><div class='card-body'> Name: "+ data2[i]["Name"] +"<br>   Email: "+ data2[i]["Email"]+ "<br>   Phone: "+ data2[i]["Phone"]+"</div></div>";
//     const box = document.getElementById('list-example');
//     box?.appendChild(el);
//     }
//     this.sh = false;
//   }
// }
  
//************************DELETE FUNCTION***************************************** 


Delete(name:string)
  {
    let data1 = localStorage.getItem("session")!;
    let data2 = JSON.parse(data1);
    console.log(data2.length);
    for(let i=0; i<data2.length; i++)
    {
      if(data2[i]["Name"]==name)
      {
        delete data2[i];
        break;
      }
    }
    var filtered = data2.filter(function (el:any) {
      return el != null;
    });
    console.log(JSON.stringify(filtered));
    localStorage.setItem("session",JSON.stringify(filtered)); 
    window.location.reload();
  }

// ************************UPDATE MAIL**********************************

  update(name:string,email:string="",phone:string=""){
    let data1 = localStorage.getItem("session")!;
    let data2 = JSON.parse(data1);
    console.log(data2.length);
    if(email!="")
    {
    for(let i=0; i<data2.length; i++)
    {
      if(data2[i]["Name"]==name)
      {
        data2[i]["Email"]=email;
        break;
      }
    }
   }
   if(phone!="")
   {
    for(let i=0; i<data2.length; i++)
    {
      if(data2[i]["Name"]==name)
      {
        data2[i]["Phone"]=phone;
        break;
      }
    }
   }
   localStorage.setItem("session",JSON.stringify(data2));
   this.Clear();
  }
  
  //********************************** COMPLETELOGIN AND CLEAR FUNCTION**************************** 
completeLogin(login :NgForm){
    // In .ts file
     
   login.reset() 
   // call this inbuilt method to reset the form
     
   }


   
Clear()
{
  const box1 = document.getElementById('addtable');
  box1?.remove();
  this.sh2=true;
  const el = document.createElement('div');
    el.innerHTML = "<div id='addtable'>";
    const box = document.getElementById('cl');
    box?.appendChild(el);
} 

// **********************************SHOW FUNCTION******************************************
show3()
{

    let data1 = localStorage.getItem("session")!;
    let data2 = JSON.parse(data1);
    for(let i=0; i<data2.length; i++)
    {
    let x = i+1;  
    const el1 = document.createElement('tr');
    el1.innerHTML = "<th scope='row'>"+x+"</th><td>"+data2[i]["Name"]+"</td><td>"+data2[i]["Email"]+"</td><td>"+data2[i]["Phone"]+"</td>";
    const box2 = document.getElementById('detail');
    box2?.appendChild(el1);
    }

}


show2()
{
  if(this.sh2!=false)
  {
  const el = document.createElement('table');
  el.setAttribute("class","table table-striped table-dark");
  el.innerHTML = `<thead>
  <tr>
  <th scope="col"> S.NO.</th>
  <th scope="col">NAME</th>
  <th scope="col">EMAIL</th>
  <th scope="col">PHONE</th>
  </tr>
  </thead>
  <tbody id="detail">
  </tbody>
  </table>`;
  const box = document.getElementById('addtable');
  box?.appendChild(el);
  this.show3();
}
this.sh2=false;
}
}