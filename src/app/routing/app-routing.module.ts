import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { environment } from '../../environments/environment';
import { LoginComponent, LoginComponentModule } from '../scam/components/login/login.component';
import { NgxPermissionsGuard } from 'ngx-permissions';
import { JobsRoutingModule } from './jobs/jobs-routing.module';

const routes: Routes = [
  {
    path: 'settings',
    loadChildren: () => import('./settings/settings-routing.module').then(m => m.SettingsRoutingModule)
  },
  {
    path: 'applications',
    loadChildren: () => import('./applications/applications-routing.module').then(m => m.ApplicationsRoutingModule)
  },
  {
    path: 'inventories',
    loadChildren: () => import('./inventories/inventories-routing.module').then(m => m.InventoriesRoutingModule)
  },
  {
    path: 'templates',
    loadChildren: () => import('./templates/templates-routing.module').then(m => m.TemplatesRoutingModule)
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [NgxPermissionsGuard],
    data: {
      permissions: {
        only: ['GUEST'],
        redirectTo: '/jobs'
      }
    }
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'login'
  }
];

@NgModule({
  imports: [
    LoginComponentModule,
    JobsRoutingModule,
    RouterModule.forRoot(routes, {enableTracing: environment.enableRouterTracing})
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
