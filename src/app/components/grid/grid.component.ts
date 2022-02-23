import { Component, OnInit, Input } from '@angular/core';
import { Hero } from 'src/app/interfaces/hero-response';
import { HeroServiceService } from 'src/app/services/hero-service.service';


@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css']
})
export class GridComponent implements OnInit {
  
  @Input ('heroes') heroes: Hero[];  
  @Input ('button') button: boolean;  

  toggle: boolean;
  info: boolean;
  

  constructor( private heroService: HeroServiceService) {
    this.toggle = false;
    this.info = false;
  }

  ngOnInit(): void {
  }
  deleteHeroe(id:string){
    this.heroService.delete(id)
  }
  addHeroe(id:string){
    this.heroService.add(id)
  }

}
