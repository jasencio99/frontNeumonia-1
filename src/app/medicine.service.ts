import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MedicineService {

  constructor(private http: HttpClient) { }

  public getData(formData: FormData): Observable<any> {
    
    return this.http.post('http://127.0.0.1:8000/deteccion_neumonia/', formData);

  }
}
