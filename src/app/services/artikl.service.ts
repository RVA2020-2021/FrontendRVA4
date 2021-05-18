import { Artikl } from './../models/artikl';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ARTIKL_URL } from '../app.constants';

@Injectable({
  providedIn: 'root'
})
export class ArtiklService {

  //DI putem konstruktora
  constructor(private httpClient: HttpClient) { }

  public getAllArtikls(): Observable<any> {
    return this.httpClient.get(`${ARTIKL_URL}`);
  }

  public addArtikl(artikl: Artikl): Observable<any> {
    //nismo nigde drugo setovali artikl.id pa moramo ovde neki default
    artikl.id=0;
    return this.httpClient.post(`${ARTIKL_URL}`, artikl);
  }

  public updateArtikl(artikl: Artikl): Observable<any> {
    return this.httpClient.put(`${ARTIKL_URL}`, artikl);
  }

  public deleteArtikl(id: number): Observable<any> {
    return this.httpClient.delete(`${ARTIKL_URL}/${id}`);
  }
}
