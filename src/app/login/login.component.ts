import {Component, OnInit, ViewChild} from '@angular/core';
import {User} from "../dto/user";
import {Login} from "../dto/login";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {FormControl} from "@angular/forms";
import {Router} from "@angular/router";
import {UserComponent} from "../user/user.component";
import {UserSessionService} from "../user-session.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss', '../app.component.scss']
})
export class LoginComponent implements OnInit {

  email = new FormControl('',[]);
  password= new FormControl('',[]);

  constructor(private http:HttpClient, private route:Router, private sessionUser:UserSessionService)
  {

  }

  ngOnInit(): void {
  }

  onClick(event: Event)
  {
    event.preventDefault();
    let userLogin:User;
    var login_request: Login = {
      email: this.email.value, password: this.password.value
    };
    let request = JSON.stringify(login_request);
    console.log(request);
    this.http.post<User>("http://localhost:8000/api/login", request, {headers : new HttpHeaders({ 'Content-Type': 'application/json' })}).subscribe((datos)=>{
        userLogin = datos as User;
        console.log(datos);
        this.sessionUser.usuario = userLogin;
        userLogin.email === 'admin@admin.com' ? this.route.navigate(['admin']) :this.route.navigate(['user']);
    },(error)=>{
      console.log('Ocurrio un error inesperado en el server', error);
    });
  }

}
