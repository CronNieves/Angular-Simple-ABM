import { Component, OnInit } from '@angular/core';
import { HeroesService } from '../../services/heroes.service';
import { Heroe } from '../../interfaces/heroe.interface';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html'
})
export class HeroesComponent implements OnInit {

  listHeroes: any[] = [];

  constructor(private _heroesService: HeroesService) { }

  ngOnInit() {
    this._heroesService.getHeroes().subscribe(
      (heroes: any) => {

        this.listHeroes = heroes;

      });
  }

  borrarHeroe( key: string ) {
    console.log(key);
    this._heroesService.deleteHeroe(key).subscribe(
      (data: any) => {
        delete this.listHeroes[key];
      });
  }

}
