import { Injectable, Component } from '@angular/core';
import { Observable, Subject, ReplaySubject, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private httpClient: HttpClient) { }

  // Get
  getall(getUrl: string): Observable<any> {
    return this.httpClient.get(getUrl)
      .pipe(catchError(this.handleError));
  }

  // GetByID
  getbyid(id: string, getByIdUrl: string): Observable<any> {
    const url = `${getByIdUrl}/${id}`;
    return this.httpClient.get(url)
      .pipe(catchError(this.handleError));
  }

  // Post
  save(model: any, saveUrl: string): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
    const body = JSON.stringify(model);
    return this.httpClient.post(saveUrl, body, httpOptions)
      .pipe(catchError(this.handleError));
  }

  // PostFormData
  saveForm(model: any, saveUrl: string): Observable<any> {
    return this.httpClient.post(saveUrl, model)
      .pipe(catchError(this.handleError));
  }

  // Delete
  delete(id: string, deleteByIdUrl: string): Observable<any> {
    const url = `${deleteByIdUrl}/${id}`;
    return this.httpClient.delete(url)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: Response) {
    return throwError(error || 'Opps!! Server error');
  }
}
