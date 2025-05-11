import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { RoomInformation } from '../models/roomInformation.model';

@Injectable({
  providedIn: 'root'
})
export class RoomInformationService {
  private url = "/RoomInformations"
  
  constructor(private http:HttpClient) { }

  public GetRoomInformations() : Observable<RoomInformation[]> {
    return this.http.get<RoomInformation[]>((environment as any).apiUrl + this.url);
  }
}
