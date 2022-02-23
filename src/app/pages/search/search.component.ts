import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Hero } from 'src/app/interfaces/hero-response';
import { HeroServiceService } from 'src/app/services/hero-service.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  heroes: Hero[] = [];

  q: string;
  button = false;
  empty = false;
  constructor( private heroService: HeroServiceService, private activatedRoute: ActivatedRoute ) {
  }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params =>{
      this.q = params.query;
      this.searchHero()
    }) 
  }

  searchHero(){
    this.heroService.search(this.q).subscribe(
      res=> {
        if(res == undefined ){
          this.empty = true
          this.heroes = [];
        } else {
          this.empty = false
          this.heroes = res
        }
      }
    )
  }

}
