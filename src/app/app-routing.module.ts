import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ErrorComponent} from "./assets/error/error.component";
import {IndexComponent} from "./assets/index/index.component";

const routes: Routes = [
  {
    path: 'index',
    component: IndexComponent,
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/index'
  },
  {
    path: 'error',
    component: ErrorComponent,
  },
  {
    path: 'security',
    loadChildren: () => import('./modules/security/security.module').then(m => m.SecurityModule)
  },{
    path: 'admin',
    loadChildren: () => import('./modules/admin/admin.module').then(m => m.AdminModule)
  },{
    path: 'clients',
    loadChildren: () => import('./modules/clients/clients.module').then(m => m.ClientsModule)
  },{
    path: 'collections',
    loadChildren: () => import('./modules/collections/collections.module').then(m => m.CollectionsModule)
  },{
    path: 'services',
    loadChildren: () => import('./modules/services/services.module').then(m => m.ServicesModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
