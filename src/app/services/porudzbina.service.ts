import { POR_URL } from './../app.constants';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Porudzbina } from '../models/porudzbina';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PorudzbinaService {

  constructor(private httpClient: HttpClient) { }

  public getAllPorudzbina(): Observable<any> {
    return this.httpClient.get(`${POR_URL}`);
  }

  public addPorudzbina(porudzbina: Porudzbina): Observable<any> {
    //nismo nigde drugo setovali porudzbina.id pa moramo ovde neki default
    porudzbina.id=0;
    return this.httpClient.post(`${POR_URL}`, porudzbina);
  }

  public updatePorudzbina(porudzbina: Porudzbina): Observable<any> {
    return this.httpClient.put(`${POR_URL}`, porudzbina);
  }

  public deletePorudzbina(id: number): Observable<any> {
    return this.httpClient.delete(`${POR_URL}/${id}`);
  }
}
