import { NgModule } from '@angular/core';
import { EditComponent } from './edit/edit.component';
import { ListComponent } from './list/list.component';
import { JournalRoutingModule } from './journal-routing.module';
import { CommonModule } from '@angular/common';
import { AddComponent } from './add/add.component';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { ReactiveFormsModule } from '@angular/forms';
import { DatePickerModule } from 'primeng/datepicker';
import { FormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';

@NgModule({
  declarations: [AddComponent, EditComponent, ListComponent],
  imports: [
    CommonModule,
    JournalRoutingModule,
    AngularEditorModule,
    ReactiveFormsModule,
    DatePickerModule,
    FormsModule,
    CalendarModule,
  ],
})
export class JournalModule {}
