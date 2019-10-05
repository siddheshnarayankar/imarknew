import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class OrderService {

  url: string = "/api/dealers";
  url_1: string = "/api/candidates";
  url_2: string = "/api/studenttokens";

  public formData = [];
  constructor(private http: HttpClient) { }


  clearData() {
    this.formData = [];
  }

  setData(value) {
    console.log(value);
    debugger
    value.forEach(element => {
      debugger
      this.formData.push(element);
    });
console.log(this.formData);
  }

  getData() {
    return this.formData;
  }

  public get(id): Observable<any> {
    return this.http.get(this.url + "/orglist/" + id);
  }

  public add(data): Observable<any> {
    return this.http.post(this.url, data);
  }

  public edit(id, data): Observable<any> {
    return this.http.put(this.url + "/" + id, data);
  }

  public delete(id): Observable<any> {
    return this.http.delete(this.url + "/" + id);
  }

  public updateStudentTokenStatus(id, data): Observable<any> {
    return this.http.put(this.url + "/updateStdTStatus/" + id, data);
  }


  // Dealer Details API
  public getDealerDetails(id): Observable<any> {
    return this.http.get(this.url + "/collegeDetails/" + id);
  }

  public addCandidates(data): Observable<any> {
    return this.http.post(this.url_1, data);
  }
  public getCandidates(id): Observable<any> {
    return this.http.get(this.url_1 + "/" + id);
  }

  public addImage(data): Observable<any> {
    return this.http.post(this.url_1 + "/test", data);
  }


  // Student Tokens details API
  public genrateToken(data): Observable<any> {
    return this.http.post(this.url_2, data);
  }
  public getGenrateTokens(current_Org_id): Observable<any> {
    return this.http.get(this.url_2 + "/" + current_Org_id);
  }
}