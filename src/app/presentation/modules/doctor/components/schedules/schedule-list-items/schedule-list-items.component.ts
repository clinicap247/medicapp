import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Schedule } from '../../../../../../models/schedule.model';
import { ScheduleItemComponent } from '../schedule-item/schedule-item.component';
import { Appointment } from '../../../../../../models/appointment.model';

@Component({
  selector: 'app-schedule-list-items',
  standalone: true,
  imports: [
    CommonModule,
    ScheduleItemComponent,
  ],
  templateUrl: './schedule-list-items.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScheduleListItemsComponent {

  @Input() appointments! :Appointment[];
  @Output() onItemSelected = new EventEmitter();




  onSelectTable(appointment : Appointment) {
    this.onItemSelected.emit(appointment);
  }


 }
