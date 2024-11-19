import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Schedule } from '../../../../../../models/schedule.model';
import { Appointment } from '../../../../../../models/appointment.model';

@Component({
  selector: '[schedule-item]',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './schedule-item.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScheduleItemComponent {


  @Input() appointment! : Appointment;

 }
