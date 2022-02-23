import { Component, OnInit } from '@angular/core';

import { Hero } from 'src/app/interfaces/hero-response';
import { HeroServiceService } from 'src/app/services/hero-service.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  heroesId:string[] = []; 
  data: {good: number, bad: number, counter: number};
  
  heroes: Hero[] = [];
  
  powerstats: {nombre: string, valor: number, icono: string}[];
  weight: {weight: number, height: number}
  empty: boolean;
  button = true;



  constructor( private heroService: HeroServiceService ) {
   this.empty = false;
   this.data = {
     good: 0,
     bad: 0,
     counter: 0
   }
  }

  ngOnInit(): void {

    this.heroService.heroId$.subscribe(
      res=>{
        this.heroesId = res
        if(this.heroesId.length == 0){
          this.empty = true
        }else{
          this.callTeam()
       
        }
      }
    )
  }
  
  callTeam(){
    //Call the team
    this.heroService.getTeam(this.heroesId).subscribe(
    res=>{
        this.heroes = res
        this.powerstats = this.getTotals()
        localStorage.setItem('data', JSON.stringify( this.data ));

    })
  }
  

  getTotals(){

    let totalI, totalF, totalV, totalD, totalP, totalC, totalW, totalH, good, bad, counter;
    totalI = totalF = totalV = totalD = totalP = totalC = totalW = totalH = good = bad = counter = 0;
    let n = this.heroes.length
    this.heroes.forEach(function(power) {
 
        totalI += parseInt(power.powerstats.intelligence);
        totalF += parseInt(power.powerstats.strength);
        totalV += parseInt(power.powerstats.speed);
        totalD += parseInt(power.powerstats.durability);
        totalP += parseInt(power.powerstats.power);
        totalC += parseInt(power.powerstats.combat);
        
        totalW += parseInt(power.appearance.weight[1]);
        totalH += parseInt(power.appearance.height[1]);
        if(power.biography.alignment === 'good'){
          good += 1
        }
        if(power.biography.alignment === 'bad'){
          bad += 1
        }
        counter += 1;
    });
    this.heroService.data = {bad, good, counter}
    this.data = {bad, good, counter}
    this.weight = {weight: Math.round(totalW/n), height: Math.round(totalH/n)}

    let total = [
      {nombre: "inteligencia", valor: totalI/n, icono: 'fas fa-brain'},
      {nombre:"fuerza", valor: totalF/n, icono: 'fas fa-dumbbell'},
      {nombre: "velocidad", valor: totalV/n, icono: 'fas fa-running'},
      {nombre: "durabilidad", valor: totalD/n, icono: 'fas fa-battery-three-quarters'},
      {nombre: "poder", valor: totalP/n, icono: 'fas fa-bolt'},
      {nombre: "combate", valor: totalC/n, icono: 'fas fa-fist-raised'}
    ];
    
    return total.sort((a, b) => b.valor - a.valor);
  }

}
