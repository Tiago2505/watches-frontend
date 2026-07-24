import { Routes } from "@angular/router";

import { WatchesTableList } from "./pages/admin-watches-table-list/admin-watches-table-list";

export const WatchesRoutes: Routes = [

  {
    path: '',
    component: WatchesTableList
  },
  {
    path: 'update/:id',
    loadComponent: ()=> import('./pages/update-watch/update-watch') .then(c => c.UpdateWatch)
  },
  {
    path: 'new',
    loadComponent: ()=> import('./pages/create-watch/create-watch').then(c=>c.CreateWatch)
  },
  {
    path: '**',
    redirectTo: ''
  }


]
