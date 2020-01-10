import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CargoService {


  public url = `http://localhost:4600`;

  constructor(
    private http: HttpClient
  ) { }

  getCargos():Observable<any>{
    return this.http.get(`${this.url}/cargo`);
  }
  
}
