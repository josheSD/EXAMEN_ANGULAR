import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { PerfifComponent } from './components/perfif/perfif.component';


const routes: Routes = [
  {path:'',component:HomeComponent},
  {path:'perfil/:id',component:PerfifComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
