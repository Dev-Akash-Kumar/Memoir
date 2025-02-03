import { JournalService } from '../services/journal.service';
import { Component, OnInit } from '@angular/core';
import { Journal } from '../models/journal';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-list',
  standalone: false,

  templateUrl: './list.component.html',
  styleUrl: './list.component.css',
  providers: [DatePipe],
})
export class ListComponent implements OnInit {
  data: Journal[] = [];

  constructor(
    private journalService: JournalService,
    private datePipe: DatePipe
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

  deleteJournal(id: String) {
    this.journalService.deleteJournal(id).subscribe((res: any) => {
      console.log('deleted', res);
      this.getAllJournal();
    });
  }
}
