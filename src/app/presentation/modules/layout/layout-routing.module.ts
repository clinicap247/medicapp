import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout.component';

const routes: Routes = [
  {
    path : 'doctor',
    component: LayoutComponent,
    loadChildren: () => import('../doctor/doctor.module').then(m => m.DoctorModule),
  },
  { path: '', redirectTo: 'doctor', pathMatch: 'full' },
  { path: '**', redirectTo: 'error/404' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LayoutRoutingModule {}
