import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SchedulesComponent } from './pages/schedules/schedules.component';
import { DoctorComponent } from './doctor.component';
import { CreateConsultingComponent } from './pages/create-consulting/create-consulting.component';

const routes: Routes = [
  {
    path: '',
    component: DoctorComponent,
    children: [
      {
        path: 'schedules',
        component: SchedulesComponent,
      },
      {
        component : CreateConsultingComponent,
        path : 'create-consulting/:id',
      },
      { path: '', redirectTo: 'schedules', pathMatch: 'full' },
      { path: '**', redirectTo: 'error/404' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DoctorRoutingModule {}
