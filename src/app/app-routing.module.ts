import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from 'src/component/dashboardComponent/dashboard.component';
import { SuccessComponent } from 'src/component/successComponent/successComponent.component';
import { ErrorComponent } from 'src/component/errorComponent/error.component';

const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent
  },
  {
    path: '',
    redirectTo: 'dashboard', // 重定向到dashboard
    pathMatch: 'full'
  },
  {
    path: 'success',
    component: SuccessComponent
  },
  {
    path: '**',
    pathMatch: 'full',
    component: ErrorComponent
  },
  {
    path: 'error',
    pathMatch: 'full',
    component: ErrorComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
