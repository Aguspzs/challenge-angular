import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, NavigationEnd } from '@angular/router';

import { AuthService } from 'src/app/services/auth.service';




@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  form: FormGroup;


  constructor( private fb:FormBuilder, private router: Router, private authService: AuthService ) {
  
    //Boton de salir
    this.router.events.subscribe(
      (e) => {
        if (e instanceof NavigationEnd){
          if ( e.url === '/login'){
            console.log('estamos en : ', e.url)
            document.getElementById('logOutButton').style.display = 'none';
          }else{
            document.getElementById('logOutButton').style.display = 'block';
          }
        }
      }
    )
  }

  ngOnInit(): void {
  this.validate()
  this.isLogged()
    
  }

  isLogged(){
    if(this.authService.isLogged()){
      this.router.navigateByUrl('/home')
    }
  }

  validate(){
    this.form = this.fb.group({
      query: ['', [Validators.required, Validators.minLength(1)]]
    })
  }

  buscar(){
    if(this.form.get('query').valid){
      this.router.navigate(['/search'], { queryParams: { query: this.form.get('query').value} });
    }
  }

  logOut(){

    this.authService.logOut()
  }

}
