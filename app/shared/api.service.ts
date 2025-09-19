import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiUrl = 'http://localhost:3000/api';

  constructor(private _http: HttpClient, private authService: AuthService) {}

  // POST request to add a restaurant
  postRestaurent(data: any) {
    return this._http.post<any>(`${this.apiUrl}/posts`, data);
  }

  // GET request to retrieve all restaurant data
  getRestaurent() {
    return this._http.get<any>(`${this.apiUrl}/posts`);
  }

  // GET request to retrieve restaurant data by user ID
  getRestaurentByUserId(userId: string) {
    return this._http.get<any>(`${this.apiUrl}/posts?userId=${userId}`);
  }

  // DELETE request to delete a restaurant
  deleteRestaurant(id: string) {
    return this._http.delete<any>(`${this.apiUrl}/posts/${id}`);
  }

  // PUT request to update a restaurant
  updateRestaurant(id: number, data: any) {
    return this._http.put<any>(`${this.apiUrl}/posts/${id}`, data);
  }

  // Fetch all generator waste data
  getAllGenerators() {
    return this._http.get<any[]>(`${this.apiUrl}/posts`);
  }
 
  // Get all posts
  getPosts(): Observable<any[]> {
    return this._http.get<any[]>(`${this.apiUrl}/posts`);
  }

  // Fetch all users from gsignup
  getUsers(): Observable<any[]> {
    return this._http.get<any[]>(`${this.apiUrl}/gsignup`);
  }

  // Send a request from generator to recycler
  sendRequest(
    wasteId: string,
    userId: string,
    recyclerId: string,
    recyclerName: string,
    transportation: string,
    address: string,
    quantity: number
  ): Observable<any> {
    const requestData = {
      id: this.generateUniqueId(),
      wasteId,
      generatorId: userId,
      recyclerName,
      recycler_info: {
        recyclerId,
        transportation,
        address,
        quantity
      },
      status: 'pending'
    };

    return this._http.post(`${this.apiUrl}/requests`, requestData);
  }

  private generateUniqueId(): string {
    return Math.random().toString(36).substr(2, 9);
  }

  getRequestsForGenerator(generatorId: string): Observable<any[]> {
    return this._http.get<any[]>(`${this.apiUrl}/requests?generatorId=${generatorId}`);
  }

  getRecyclerById(recyclerId: string) {
    return this._http.get<any>(`${this.apiUrl}/rsignup/${recyclerId}`);
  }


  signupGenerator(data: any): Observable<any> {
    return this._http.post<any>(`${this.apiUrl}/gsignup`, data);
  }
  
}
