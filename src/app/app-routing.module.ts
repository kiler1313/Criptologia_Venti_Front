import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {RegistryComponent} from "./registry/registry.component";
import {UserComponent} from "./user/user.component";
import {AdminComponent} from "./admin/admin.component";

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'login'},
  { path:  'login', component: LoginComponent },
  { path:  'register', component: RegistryComponent },
  { path:  'user', component: UserComponent },
  { path:  'admin', component: AdminComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
