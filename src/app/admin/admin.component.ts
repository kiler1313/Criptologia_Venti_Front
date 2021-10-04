import {Component, OnInit} from '@angular/core';

import {User} from "../dto/user";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Token} from "../dto/token";
import {FormControl} from "@angular/forms";
import {from} from "rxjs";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss', '../app.component.scss']
})

export class AdminComponent implements OnInit {

  tokenMaster = new  FormControl('',[]);
  tokenInfo = new  FormControl('',[]);
  tokenInfoQuery:string = "";
  tokenMasterQuery: string="";
  tokenPublicQuery:string = "";
  tokenComplete:string = "";
  modifyState:boolean = false;
  dataSource:any;
  displayedColumns:string[] = ['id', 'name', 'document', 'phone', 'email'];

  constructor(private http:HttpClient) {
    var requestToken = {"user_special" : "admin"}
    this.queryAllTokens(requestToken);
  }

  ngOnInit(): void {
  }

  queryAllTokens(request: any):void{
    let tokenResponse:Token[];
    this.http.post<Token[]>("http://localhost:8000/api/showTokens", request, {headers : new HttpHeaders({ 'Content-Type': 'application/json' })}).subscribe((datos)=>{
      tokenResponse = datos as Token[];
      this.tokenPublicQuery = tokenResponse[0].token_access;
      this.tokenMasterQuery = tokenResponse[0].token_master_admin;
      this.tokenInfoQuery = tokenResponse[0].token_decryp_information;
      var requestUser = {"token": tokenResponse[0].token_access};
      this.queryAllUser(requestUser);
    },(error)=>{
      console.log('Ocurrio un error inesperado en el server', error);
    });
  }

  queryAllUser(request: any):void{
    let usersResponse:User[];
    console.log(request);
    this.http.post<User[]>("http://localhost:8000/api/queryAllUsers", request, {headers : new HttpHeaders({ 'Content-Type': 'application/json' })}).subscribe((datos)=>{
      usersResponse = datos as User[];
      this.dataSource = usersResponse;
    },(error)=>{
      console.log('Ocurrio un error inesperado en el server', error);
    });
  }

  changeTokenPublic():void{
    var request = {"token_public" : this.tokenPublicQuery}
    let tokenResponse:Token[];
    this.http.post<Token[]>("http://localhost:8000/api/editTokenPublic", request, {headers : new HttpHeaders({ 'Content-Type': 'application/json' })}).subscribe((datos)=>{
      tokenResponse = datos as Token[];
      this.tokenPublicQuery = tokenResponse[0].token_access;
    },(error)=>{
      console.log('Ocurrio un error inesperado en el server', error);
    });
  }

  changeTokensMasterAndInfo(event: Event):void{
    event.preventDefault();
    var request = {"admin_word_token" : this.tokenMaster.value, "admin_word_info" : this.tokenInfo.value }
    console.log(request);
    let tokenResponse:any;
    this.tokenComplete = "";
    this.http.post("http://localhost:8000/api/editTokensMaster", request, {headers : new HttpHeaders({ 'Content-Type': 'application/json' })}).subscribe((datos)=>{
      tokenResponse = datos;
      console.log(tokenResponse);
      var requestToken = {"user_special" : "admin"}
      this.queryAllTokens(requestToken);
      this.tokenComplete = "Se cambiaron los datos satisfactoriamente";
      this.modifyState = false;
    },(error)=>{
      console.log('Ocurrio un error inesperado en el server', error);
      this.tokenComplete = "Ocurrio un error inesperado";
    });
  }

  changeStateToken(): void{
    this.modifyState = this.modifyState ? false : true;
  }

}
