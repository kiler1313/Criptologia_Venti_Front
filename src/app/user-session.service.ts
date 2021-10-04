import { Injectable } from '@angular/core';
import {User} from "./dto/user";

@Injectable({
  providedIn: 'root'
})
export class UserSessionService {

  usuario:User;

  constructor() { }
}
