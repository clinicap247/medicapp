import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Schedule } from '../../../../../../models/schedule.model';
import { DetailListener } from '../../../../shared/interfaces/Detail.listener';
import { Appointment } from '../../../../../../models/appointment.model';

@Component({
  selector: 'app-schedule-detail',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './schedule-detail.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScheduleDetailComponent {

  // @Input() schedule!: Schedule;
  @Input() appointment! : Appointment;
  @Input() detailListener! : DetailListener<Appointment>;




  close(){
    this.detailListener.close();
  }

  onSubmit(){
    // this.detailListener.submit(this.doctorForm);
  }

  onDelete() {
    this.detailListener.delete(this.appointment.id);
  }
 }
