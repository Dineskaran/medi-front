import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Login } from '../model/login';


@Injectable({
  providedIn: 'root'
})
export class LoginService {
  // private apiUrl = 'http://localhost:8080/api/authenticate';
  // private headers = new HttpHeaders({'Content-Type': 'application/json'});


  constructor(private http: HttpClient) { }

  // login(credentials: Login) {
  //   // Implement your login logic here
  //   // This could involve making an API call or using local storage
  //   // Replace with your actual implementation

  //   return new Promise((resolve, reject) => {
  //     setTimeout(() => {
  //       if (credentials.username === 'admin' && credentials.password === 'password') {
  //         resolve(true); // Simulate successful login
  //         localStorage.setItem('isLoggedIn', 'true'); // Example using localStorage
  //       } else {
  //         reject(new Error('Invalid credentials'));
  //       }
  //     }, 1000); // Simulate delay
  //   });
  // }
}
