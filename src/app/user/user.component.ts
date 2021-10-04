import { Component, OnInit } from '@angular/core';
import {UserSessionService} from "../user-session.service";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss', '../app.component.scss']
})
export class UserComponent implements OnInit {

  name:string;
  email:string;
  phone:string;
  document:string;
  constructor(public userSesion: UserSessionService)
  {
    this.name = userSesion.usuario.name;
    this.email = userSesion.usuario.email;
    this.phone = userSesion.usuario.phone;
    this.document = userSesion.usuario.document;
  }

  ngOnInit(): void {
  }

}
