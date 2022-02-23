import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  private url = "http://challenge-react.alkemy.org/";
  token = '';
  
  constructor( private http: HttpClient, private router: Router ) {
    this.getToken()
    
  }
  
  getToken(){
    if ( localStorage.getItem('token') ){
      this.token = localStorage.getItem('token')
    }else{
      this.token = '';
    }
  }

  isLogged(){
   this.getToken()
    if( this.token.length > 2){
      return true
    } else {
      return false
    }
  }

  logIn(email: string, password: string){ 

    // email: "challenge@alkemy.org",
    // password: "react"

    return this.http.post<any>(this.url, {email, password}).pipe(
      map(
          res=> {
            this.saveToken(res.token)
            this.router.navigateByUrl('/home')
          },
          err => console.log(err)
      )
    )
  }

  logOut(){
    if ( localStorage.getItem('token') ){
      localStorage.removeItem('token')
      this.token = '';
    }
    this.router.navigateByUrl('/login')
  }


  private saveToken(token: string){
    this.token = token;
    localStorage.setItem('token', token);
  }

 
 
}
