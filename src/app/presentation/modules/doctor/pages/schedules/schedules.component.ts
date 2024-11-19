import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
  ViewChild,
  inject,
} from '@angular/core';
import { SchedulesHeaderComponent } from '../../components/schedules/schedules-header/schedules-header.component';
import { ScheduleListItemsComponent } from '../../components/schedules/schedule-list-items/schedule-list-items.component';
import { FormControl } from '@angular/forms';
import { InputTextComponent } from '../../../shared/components/form-inputs/input-text/input-text.component';
import { FormTemplateComponent } from '../../../shared/components/form-template/form-template.component';
import { ModalFormComponent } from '../../../shared/components/modal-form/modal-form.component';
import { ActionType } from '../../../shared/enum/action';
import { DialogService } from '../../../shared/services/Dialog.service';
import { ModalService } from '../../../shared/services/Modal.service';
import { DynamicForm } from '../../../shared/types/dynamic.types';
import { InputDateComponent } from '../../../shared/components/form-inputs/input-date/input-date.component';
import { InputFileComponent } from '../../../shared/components/form-inputs/input-file/input-file.component';
import { InputSelectComponent } from '../../../shared/components/form-inputs/input-select/input-select.component';
import { DcDirective } from '../../../shared/directives/dc.directive';
import { ScheduleDetailComponent } from '../../components/schedules/schedule-detail/schedule-detail.component';
import { InputTimeComponent } from '../../../shared/components/form-inputs/input-time/input-time.component';
import { DoctorService } from '../../../../../services/grapql/doctor.service';
import { Doctor } from '../../../../../models/doctor.model';
import { Subject } from 'rxjs';
import { ConsultingRoom } from '../../../../../models/consultingRoom.model';
import { Specialty } from '../../../../../models/specialty.model';
import { CustomService } from '../../../../../services/grapql/custom.service';
import { ItemList } from '../../../shared/components/item-list/interfaces/ItemList.interfaces';
import { responseModalFormMapper } from '../../../shared/utils/mappers/response-modal-form/response-modal-form';
import { ScheduleService } from '../../../../../services/grapql/schedule.service';
import { Schedule } from '../../../../../models/schedule.model';
import { DetailListener } from '../../../shared/interfaces/Detail.listener';
import { Appointment } from '../../../../../models/appointment.model';
import { AppointmentsService } from '../../../auth/services/grapql/appointments.service';

@Component({
  selector: 'app-schedules',
  standalone: true,
  imports: [
    CommonModule,
    SchedulesHeaderComponent,
    ScheduleListItemsComponent,
    DcDirective,
  ],
  templateUrl: './schedules.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SchedulesComponent implements OnInit {
  ngOnInit(): void {


    const actualDayNumber = new Date().getDay();



    this.loadItemsLists();

    this.loadItems({dayOfWeek : actualDayNumber});


  }



  @ViewChild(DcDirective) dcWrapper!: DcDirective;

  private customQueriesService = inject(CustomService);
  private cdr = inject(ChangeDetectorRef);
  private dialogService = inject(DialogService);
  private modalService = inject(ModalService);
  private appointmentService = inject(AppointmentsService);

  appointments : Appointment[]= [];

  // doctors : Doctor[] = [];
  // consultoringRooms : ConsultingRoom[] = [];
  // specialties : Specialty[] = [];




  async loadItemsLists() {
    const notifierDialog: Subject<any> = new Subject();
    this.dialogService.showLoading({
      description: 'Cargando',
      listener: notifierDialog,
    });

    const doctorId = localStorage.getItem('doctorId');

    const result =
      await this.appointmentService.getByParams({doctorId : parseInt(doctorId!)});

    notifierDialog.next(0);
    if (!result.isSuccess) {
      this.dialogService.showError({ description: result.error });
      return;
    }


    this.appointments = result.value;

    this.cdr.detectChanges();
  }


  onShowItem: boolean = false;

  onItemSelected(appointment : Appointment) {

    if(appointment.status !==0){
      return;
    }
    const viewContainerRef = this.dcWrapper.viewContainerRef;

    viewContainerRef.clear();

    const componentFactory = viewContainerRef.createComponent(
      ScheduleDetailComponent
    );

    componentFactory.instance.appointment = appointment;

    // componentFactory.instance.detailListener = this.detailListener;
    // componentFactory.instance.schedule = schedule;

    // componentFactory.instance.outputdetailListener = this.outputDetailListener;
    // componentFactory.instance.outputProduct = outputProduct;

    this.onShowItem = true;
  }


  detailListener: DetailListener<Schedule> = {
    close: () => {
      this.dcWrapper.viewContainerRef.clear();
      this.onShowItem = false;
    },
    cancel: () => {
      this.dcWrapper.viewContainerRef.clear();
      this.onShowItem = false;
    },
    submit: (form) => {
      this.dcWrapper.viewContainerRef.clear();
      this.onShowItem = false;

      this.dialogService
        .showAlert({ description: 'Estas seguro de realizar la modificacion?' })
        .subscribe((resp) => {

          const { id, code, fullName, user_id, email } = form.value;

          const dto = {
            code,
            user: {
              id: user_id,
              fullName,
              email
            }
          }


          // this.updateDoctor(id,dto);

        });
    },

    delete: (id) => {
      this.dcWrapper.viewContainerRef.clear();
      this.onShowItem = false;

      this.dialogService
        .showAlert({ description: 'Estas seguro de realizar la eliminacion?' })
        .subscribe((resp) => {


        });
    },
  };




  async createAppoitment(inputs: { [key: string]: any }) {

  }


  async loadItems(params : {[key:string] :any}) {


  }


}
