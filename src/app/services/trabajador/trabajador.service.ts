import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map , catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TrabajadorService {

  public url = `http://localhost:4600`;

  constructor(
    private http: HttpClient
  ) {

   }

   getTrabajadores():Observable<any>{
     return this.http.get(`${this.url}/trabajador`)
                .pipe(
                  map((res:any)=>{
                    return res;
                  }),
                  catchError((err:any)=>{
                    return throwError(err);
                  })
                )
   }

   getTrabajador(id:number|string):Observable<any>{
     return this.http.get(`${this.url}/trabajador/one/${id}`)
              .pipe(
                map((res:any)=>{
                  return res;
                }),
                catchError((err:any)=>{
                  return throwError(err);
                })
              )

   }

   putTrabajador(body:any):Observable<any>{
     return this.http.put(`${this.url}/trabajador`,body) 
                  .pipe(
                    map((res:any)=>{
                      return res;
                    }),
                    catchError((err:any)=>{
                      return throwError(err);
                    })
                  )
   }

   postTrabajador(body:any):Observable<any>{
     return this.http.post(`${this.url}/trabajador`,body)
                    .pipe(
                      map((res:any)=>{
                        return res;
                      }),
                      catchError((err:any)=>{
                        return throwError(err);
                      })
                    )
   }

   deleteTrabajador(id:string|number):Observable<any>{
      return this.http.delete(`${this.url}/trabajador/${id}`)
                  .pipe(
                    map((res:any)=>{
                      return res;
                    }),
                    catchError((err:any)=>{
                      return throwError(err);
                    })
                  )
   }


}
