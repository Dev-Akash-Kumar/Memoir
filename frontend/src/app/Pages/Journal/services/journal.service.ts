import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Journal } from '../model/journal';
import { environment } from '../../../../environments/environment';
@Injectable({
  providedIn: 'root',
})
export class JournalService {
  private apiURL = environment.apiUrl;

  // private httpOptions = {
  //   headers: new HttpHeaders().set('Content-Type', 'application/json'),
  // };

  readonly addUrl = `${environment.apiUrl}/journal/create`;
  readonly listUrl = `${environment.apiUrl}/journal/list`;
  readonly deleteUrl = `${environment.apiUrl}/journal/delete`;

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
