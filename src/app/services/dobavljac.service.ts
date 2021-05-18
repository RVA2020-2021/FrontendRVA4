import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DOB_URL } from '../app.constants';
import { Dobavljac } from '../models/dobavljac';

@Injectable({
  providedIn: 'root'
})
export class DobavljacService {

  constructor(private httpClient: HttpClient) { }

  public getAllDobavljac(): Observable<any> {
    return this.httpClient.get(`${DOB_URL}`);
  }

  public addDobavljac(dobavljac: Dobavljac): Observable<any> {
    //nismo nigde drugo setovali artikl.id pa moramo ovde neki default
    dobavljac.id=0;
    return this.httpClient.post(`${DOB_URL}`, dobavljac);
  }

  public updateDobavljac(dobavljac: Dobavljac): Observable<any> {
    return this.httpClient.put(`${DOB_URL}`, dobavljac);
  }

  public deleteDobavljac(id: number): Observable<any> {
    return this.httpClient.delete(`${DOB_URL}/${id}`);
  }
}
