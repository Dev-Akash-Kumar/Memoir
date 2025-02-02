import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Journal } from '../models/journal';
@Injectable({
  providedIn: 'root',
})
export class JournalService {
  private apiURL = 'http://localhost:8080/api/v1';

  readonly addUrl = `${this.apiURL}/journal/create`;
  readonly listUrl = `${this.apiURL}/journal/list`;
  readonly deleteUrl = `${this.apiURL}/journal/delete`;

  constructor(private http: HttpClient) {}

  addJournal(data: any): Observable<Journal[]> {
    return this.http.post<Journal[]>(this.addUrl, data);
  }

  getAllJournal() {
    return this.http.get(this.listUrl);
  }

  deleteJournal(id: String) {
    return this.http.delete(`${this.deleteUrl}/${id}`);
  }
}
