import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin.routing.module';
import { HomeComponent } from './home/home.component';
import { CustommaterialModule } from '../custommaterial/custommaterial.module';



@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    CustommaterialModule
  ]
})
export class AdminModule { }
