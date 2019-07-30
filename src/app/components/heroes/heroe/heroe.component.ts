import { Component, OnInit } from '@angular/core';
import { NgForm } from "@angular/forms";
import { Router, ActivatedRoute } from '@angular/router';

import { Heroe } from '../../../interfaces/heroe.interface';
import { HeroesService } from '../../../services/heroes.service';


@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html'
})
export class HeroeComponent implements OnInit {

  heroe: Heroe = {
    nombre: '',
    casa: '',
    bio: ''
  }

  nuevo: boolean = false;
  id: string;

  constructor(private _heroesService: HeroesService,
              private router: Router,
              private route: ActivatedRoute) {

    this.route.params.subscribe( parametros => {

      this.id = parametros['id'];

      if (this.id === 'nuevo') { //Nuevo
        this.nuevo = true;
      } else { //Actualizando
        this.nuevo = false;
        _heroesService.getHeroe( this.id ).subscribe( (heroe: any) => this.heroe = heroe );
      }
    });
  }

  ngOnInit() {
  }

  guardar() {

    if ( this.nuevo ) {
      this._heroesService.newHeroe( this.heroe ).subscribe( (data: any) => {
        console.log('Servicio guardar response: ', data);
        this.router.navigate(['/heroe', data.name]);
      });

    } else {
      this._heroesService.updateHeroe( this.heroe, this.id ).subscribe( (data: any) => {
        console.log('Servicio guardar response: ', data);
      });
    }
  }

}
