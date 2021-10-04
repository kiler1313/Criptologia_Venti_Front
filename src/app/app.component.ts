import { Component } from '@angular/core';
import {AngularMaterialModule} from "./angular-material/angular-material.module";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Venti - Administrador de usuarios';
}
