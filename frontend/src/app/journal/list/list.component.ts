import { JournalService } from '../services/journal.service';
import { Component, OnInit } from '@angular/core';
import { Journal } from '../models/journal';
import { CommonModule, DatePipe } from '@angular/common';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialog } from 'primeng/confirmdialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list',
  imports: [CommonModule, ButtonModule, ConfirmDialog, ToastModule],
  standalone: true,
  templateUrl: './list.component.html',
  styleUrl: './list.component.css',
  providers: [DatePipe, ConfirmationService, MessageService],
})
export class ListComponent implements OnInit {
  data: Journal[] = [];
  constructor(
    private journalService: JournalService,
    private datePipe: DatePipe,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private route: Router
  ) {}

  ngOnInit(): void {
    // loads journal list
    this.getAllJournal();
  }

  // Custom date format function
  formatDate(date: Date) {
    const dateObj = new Date(date);
    const day = dateObj.getDate();
    const month = dateObj.toLocaleString('default', { month: 'long' });
    const year = dateObj.getFullYear();
    const suffix = this.getDaySuffix(day); // Get the day suffix like 'st', 'nd', 'rd', 'th'
    return `${day}${suffix} ${month}, ${year}`;
  }

  // Function to determine the day suffix (e.g. 1st, 2nd, 3rd, 4th)
  getDaySuffix(day: number): string {
    const j = day % 10,
      k = day % 100;
    if (j === 1 && k !== 11) {
      return 'st';
    }
    if (j === 2 && k !== 12) {
      return 'nd';
    }
    if (j === 3 && k !== 13) {
      return 'rd';
    }
    return 'th';
  }

  // get all journals
  getAllJournal() {
    this.journalService.getAllJournal().subscribe((res: any) => {
      console.log(res);
      this.data = res.data;
    });
  }

  deleteJournal(id: string) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to Delete?',
      header: 'Confirmation',
      closable: true,
      closeOnEscape: true,
      icon: 'pi pi-exclamation-triangle',
      rejectButtonProps: {
        label: 'Cancel',
        severity: 'secondary',
        outlined: true,
      },
      acceptButtonProps: {
        label: 'Delete',
      },
      accept: () => {
        this.journalService.deleteJournal(id).subscribe(
          (res: any) => {
            // this.getAllJournal();

            this.messageService.add({
              severity: 'info',
              summary: 'Deleted !!',
              detail: 'Journal deleted successfully !!',
            });
            this.confirmationService.close();
          },
          (error) => {
            console.log('error', error);
            this.messageService.add({
              severity: 'error',
              summary: 'Error !!',
              detail: 'Failed to delete journal !!',
              life: 3000,
            });
            this.confirmationService.close();
          }
        );
      },
      reject: () => {
        // If rejected, show rejection message
        this.messageService.add({
          severity: 'error',
          summary: 'Cancelled !!',
          detail: 'Failed to delete journal !!',
          life: 3000,
        });
        this.confirmationService.close();
      },
    });
  }

  viewJournal(id: string) {}

  editJournal(id: string): void {
    this.route.navigate(['journal', 'edit', id]);
  }
}
