import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, forkJoin, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

import { HerosResponse, Hero } from '../interfaces/hero-response';

import Swal from 'sweetalert2'


@Injectable({
  providedIn: 'root'
})
export class HeroServiceService {

  private url = 'https://superheroapi.com/api.php/5518877314794367';

  
  heroIdSubject: BehaviorSubject<string[]>;


  heroId$: Observable<string[]>;
 

  heroesId: string[] = [];
  data = {good: 0, bad: 0, counter: 0};
  


  constructor( private http: HttpClient ) {
    //Recupera datos del Local Storage
     this.getValues()
  }

  getValues(){
    if(  JSON.parse(localStorage.getItem('heroesId')) !== null ){
      this.heroesId =  JSON.parse(localStorage.getItem('heroesId'));
    }

    if(  JSON.parse(localStorage.getItem('data')) !== null ){
      this.data =  JSON.parse(localStorage.getItem('data'));
    }

    this.heroIdSubject = new BehaviorSubject<string[]>(this.heroesId);
    this.heroId$ = this.heroIdSubject.asObservable();

  }

  setValue(hero: string[], accion: string): void {
    
    localStorage.removeItem('heroesId')
    localStorage.setItem('heroesId', JSON.stringify( hero ));
    this.heroIdSubject.next(hero);
     Swal.fire({
      icon: 'success',
      title: `Héroe ${accion} con exito!`,
      showConfirmButton: false,
      timer: 1500
    })

  }

  
  delete(id: string){
    let index = this.heroesId.indexOf(id);
    if (index > -1) { 
      this.heroesId.splice(index, 1);
    }
    this.setValue(this.heroesId, 'borrado')
  }

  add(id: string){
    if(this.data.counter>=6){
      return this.error()
 
    } else if ( this.heroesId.indexOf(id) == -1 ) {
      this.getAlignment(id).subscribe(
        res => {
          if ( res === 'good' || res === 'neutral'){
            if(this.data.good>=3){
              return this.error()
            
            } else {
              this.heroesId.push(id)
              this.setValue(this.heroesId, 'agregado')
            }
          }
          if ( res === 'bad' ){
            if(this.data.bad>=3){
              return this.error()
             
            } else {       
              this.heroesId.push(id)
              this.setValue(this.heroesId, 'agregado')
            }
          }
        }
        )
      }else{
        return this.error()
    }
  }
  
  getAlignment(id:string): Observable<any>{
    return this.http.get<any>(`${this.url}/${id}`).pipe(map( (resp) => resp.biography.alignment))
  }

  getTeam(args:string[]):Observable<Hero[]> {
    //recibo los id en un array y armo otro con los obs
    let link = [];
    let url = this.url
    args.forEach(function(id){
      link.push(`${url}/${id}`)
    });
    
    return forkJoin(link.map(e=>this.http.get<Hero>(e)));
  }

  getHeroe(id:string):Observable<Hero>{
   return this.http.get<Hero>(`${this.url}/${id}`)
  }

  search(q:string):Observable<Hero[]>{
    return this.http.get<HerosResponse>(`${this.url}/search/${q}`).pipe(
      map(
        resp=> resp.results
      )
      )
  }
    
  private error(){
      return Swal.fire({
      icon: 'error',
      title: 'Hubo un error!',
      text: 'Recuerda: El equipo acepta un máximo de 6 héroes, de los cuales tres pueden ser buenos y tres malos. Sus integrantes no pueden repetirse.'
    })
  }

}
