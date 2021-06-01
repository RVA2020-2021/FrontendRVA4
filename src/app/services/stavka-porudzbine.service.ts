import { StavkaPorudzbine } from './../models/stavka-porudzbine';
import { STAV_POR_URL, STAV_POR_ZA_POR_URL } from './../app.constants';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StavkaPorudzbineService {

  constructor(private httpClient: HttpClient) { }

  public getStavkeZaPorudzbinu(idPorudzbine: number): Observable<any> {
    return this.httpClient.get(`${STAV_POR_ZA_POR_URL}/${idPorudzbine}`);
  }

  public addStavkaPor(stavkaPorudzbine: StavkaPorudzbine): Observable<any> {
    stavkaPorudzbine.id=0;
    return this.httpClient.post(`${STAV_POR_URL}`, stavkaPorudzbine);
  }

  public updateStavkaPor(stavkaPorudzbine: StavkaPorudzbine): Observable<any> {
    return this.httpClient.put(`${STAV_POR_URL}`, stavkaPorudzbine);
  }

  public deleteStavkaPor(id: number): Observable<any> {
    return this.httpClient.delete(`${STAV_POR_URL}/${id}`);
  }
}
