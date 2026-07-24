import { Routes } from '@angular/router';

import { AdminDashboard } from './pages/admin-dashboard/admin-dashboard';

export const AdminRoutes: Routes = [
  {
    path: '',
    component: AdminDashboard,
    loadChildren: () => [
      {
        path: 'watches',
        loadChildren: () => import('../watches/watches.route').then((c) => c.WatchesRoutes),
      },
    ],
  },
];
