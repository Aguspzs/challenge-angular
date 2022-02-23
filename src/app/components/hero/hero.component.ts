import { Component, OnInit, Input } from '@angular/core';
import { Hero } from 'src/app/interfaces/hero-response';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.css']
})
export class HeroComponent implements OnInit {

  @Input ('heroe') heroe: Hero;

  @Input ('index') index: string;

  constructor() { }

  ngOnInit(): void {
  }

}
