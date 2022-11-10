import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment.prod';
import { IgetDataResponse } from '../models/responses/Iterritories-response';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class TerritoriesService extends BaseService{

  constructor (private _http: HttpClient) {
    super();
  }

  getTerritories():Observable<any> { 
    return this._http.get(this.GenerateUrl(environment.apiUrl,environment.territoriesUrl),{observe: 'response'}).pipe(map(data => {
         return data
           }));
   }
}
