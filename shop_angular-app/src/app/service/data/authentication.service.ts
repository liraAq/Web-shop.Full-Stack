import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  isLoggedIn: boolean = false;
  private apiUrl = 'http://localhost:8080/api';
  // private apiUrl = 'http://localhost:9090/api';




  constructor(private http: HttpClient) { }

  getUsername(): Observable<string> {
    const url = `${this.apiUrl}/username`;
    return this.http.get<string>(url);
  }

  getAuthenticatedUser(): Observable<any> {
    const url = `${this.apiUrl}/user`;
    return this.http.get<any>(url);
  }

  getAuthenticatedUserId(): Observable<string> {
    const token = localStorage.getItem('token');
    const headers = { Authorization: `Bearer ${token}` };
    return this.http.get<string>(`${this.apiUrl}/userid`, { headers });
  }

  registerUser(userCredentials: any): Observable<any> {
    const url = `${this.apiUrl}/register`;
    return this.http.post<any>(url, userCredentials).pipe(
      catchError((error) => {
        console.error('HTTP error:', error);
        return throwError('Registration failed. Please try again later.');
      })
    );
  }

  updateUser(updatedUserData: any): Observable<any> {
    const updateUrl = `${this.apiUrl}/update`;
    return this.http.put<any>(updateUrl, updatedUserData);
  }

  getUser(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/user`);
  }

  authenticateUser(userCredentials: any): Observable<any> {
    const url = `${this.apiUrl}/authenticate`;
    return this.http.post(url, userCredentials).pipe(
      catchError((error) => {
        console.error('HTTP error:', error);
        return throwError('Login failed. Please try again later.');
      })
    );
  }

  // getUserRole(email: string): Observable<string> {
  //   const params = new HttpParams().set('email', email);
  //   return this.http.get<string>(`${this.apiUrl}/role`, { params });
  // }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    return !!token; 
  }

  isAdmin(): Promise<boolean> {
  // Retrieve authentication token from local storage
    const authToken = localStorage.getItem('token');

    // Make a request to the backend to fetch the user's role
    return this.http.get(`${this.apiUrl}/user/role`, {
      responseType: 'text',
      headers: {
        Authorization: `Bearer ${authToken}`
      }
    })
    .toPromise()
    .then(response => {
      // Check if the user role is 'ADMIN'
      return response !== undefined && response === 'ADMIN';
    })
    .catch(error => {
      console.error('Error fetching user role:', error);
      return false; // Assume user is not an admin in case of error
    });
  }
  
  logout(){
    localStorage.removeItem('token');
    this.isLoggedIn = false
    this.isAuthenticated();
  }
  
}
