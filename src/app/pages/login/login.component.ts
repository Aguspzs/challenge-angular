import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

import Swal from 'sweetalert2'




@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

 form: FormGroup;



  constructor( private fb:FormBuilder, private authService: AuthService ) { }

  ngOnInit(): void {
    this.validate()

  }
  
  validate(){
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.minLength(1), Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4)]]
    })
  }


  logIn(){
   
    if(this.form.valid){
      Swal.fire({
           allowOutsideClick: false,
           icon: 'info',
           text: 'Espere por favor...'
         });
         Swal.showLoading()
         this.authService.logIn(this.form.get('email').value, this.form.get('password').value).subscribe(
           res=>{
             Swal.fire({
               icon: 'success',
               title: `Ingreso con exito!`,
                showConfirmButton: false,
               timer: 1500
             })
        
           }, err =>{
           console.log(err)
           Swal.fire({
             icon: 'error',
             title: 'Hubo un error',
              text: 'Email o contraseña incorrectos!'
           })
          }
         )
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Hubo un error',
         text: 'Ingrese un formato de email válido y una contraseña con un mínimo de 4 caracteres!'
      })
      return
    }
   }
}
