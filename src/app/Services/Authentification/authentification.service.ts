import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Users } from 'app/Model/Users';
import { map } from 'rxjs/operators';

// le corps à envoyer
let oauth2_client_id = 2;
let oauth2_client_secret = 'CeIVUVcwNpB9ziIEjf7ZxofwIgOiqyWyWS1gurlN';

// Header option 
const httpOptions = 
{ 
  headers : new HttpHeaders({
  "Content-Type": "application/x-www-form-urlencoded",
  "Accept": "application/json",
  "Authorization": "Basic " + btoa(oauth2_client_id + ":" + oauth2_client_secret)
  }) 
};


@Injectable({
  providedIn: 'root'
})
export class AuthentificationService {

  isLoggedIn = false;

  constructor(private http : HttpClient, private router : Router) 
  { }

  // Authentification de l'utilisateur
  loginUser(user : Users)
  {
    // le body à envoyer
    let body = "email=" + user.email + "&password=" + user.password + "&grant_type=password&" + "client_secret=" + oauth2_client_secret + "&client_id=" + oauth2_client_id;

    return this.http.post<Users[]>('http://localhost:8000/api/', body, httpOptions)
    .pipe(
      map((result : any) => 
      {
        if(result.access_token)
        {
          localStorage.setItem('access_token', result.access_token);
          this.isLoggedIn = true;
          // console.log(result)
        }
      })
    )
  }

  // Logout l'utilisateur
  logoutUser()
  {
    localStorage.removeItem('access_token');
    this.router.navigate(['login']);
    this.isLoggedIn = false;
  }
}
