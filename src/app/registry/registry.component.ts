import { Component, OnInit } from '@angular/core';
import {FormControl} from "@angular/forms";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {User} from "../dto/user";

@Component({
  selector: 'app-registry',
  templateUrl: './registry.component.html',
  styleUrls: ['./registry.component.scss', '../app.component.scss']
})
export class RegistryComponent implements OnInit {

  name = new  FormControl('',[]);
  phone = new  FormControl('',[]);
  email = new  FormControl('',[]);
  password = new  FormControl('',[]);
  document = new  FormControl('',[]);
  respuesta:String = "";
  constructor(private http:HttpClient) { }

  ngOnInit(): void {
  }

  registryUser(event: Event):void{
    event.preventDefault();
    let respuesta:any;
    let request:User = {
      email : this.email.value,
      name : this.name.value,
      phone: this.phone.value,
      document : this.document.value,
      password :this.password.value
    };
    this.respuesta = "";
    this.http.post<any>("http://localhost:8000/api/createUser", request, {headers : new HttpHeaders({ 'Content-Type': 'application/json' })}).subscribe((datos)=>{
      respuesta = datos as any;
      this.respuesta = "Se registro correctamente el usuario";
      this.email = new  FormControl('',[]);
      this.name = new  FormControl('',[]);
      this.phone = new  FormControl('',[]);
      this.document= new  FormControl('',[]);
      this.password = new  FormControl('',[]);
    },(error)=>{
      console.log('Ocurrio un error inesperado en el server', error);
    });
  }
}
