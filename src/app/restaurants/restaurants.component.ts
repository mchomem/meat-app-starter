import { Component, OnInit } from '@angular/core';
import { Restaurant } from './restaurant/restaurant.model';
import { RestaurantsService } from './restaurants.service';
import { trigger, state, style, transition, animate } from '@angular/animations'
import { FormBuilder, FormControl, FormGroup } from '@angular/forms'

import 'rxjs/add/operator/switchMap'
import 'rxjs/add/operator/debounceTime'
import 'rxjs/add/operator/distinctUntilChanged'
import 'rxjs/add/operator/catch'
import 'rxjs/add/observable/from'
import { Observable } from 'rxjs/Observable'


@Component({
  selector: 'mt-restaurants'
  , templateUrl: './restaurants.component.html'
  , animations: [
    trigger('toogleSearch', [
      state('hidden', style({
        opacity: 0
        , 'max-height': '0px'
      }))
      , state('visible', style({
        opacity: 1
        , 'max-height': '70px'
        , 'margin-top': '20px'
      }))
      , transition('* => *', animate('250ms 0s ease-in-out'))
    ])
  ]
})
export class RestaurantsComponent implements OnInit {

  searchBarState: string = 'hidden'
  restaurants: Restaurant[]

  searchForm: FormGroup
  searchControl: FormControl

  constructor(private restaurantsService: RestaurantsService
    , private fb: FormBuilder) { }

  ngOnInit() {
    this.searchControl = this.fb.control('')
    this.searchForm = this.fb.group({
      searchControl: this.searchControl
    })

    // Para começar a capturar o que o usuário está digitando no campo de busca
    //this.searchControl.valueChanges.subscribe(searchTerm => console.log(searchTerm))

    this.searchControl.valueChanges
      .debounceTime(500) // Não executa os métodos abaixo antes que se passe meio segundo
      .distinctUntilChanged() // Cuja o valor do termo de busca seja diferente do que o usuário já informou.
      .switchMap(searchTerm =>
        this.restaurantsService
        .restaurants(searchTerm)
        .catch(error => Observable.from([]))) // Em caso de erro (por falha na comunicação) devolve um array vazio.
      .subscribe(restaurants => this.restaurants = restaurants)

    /* Para o cenário onde o usuário digita o termo de busca, a aplicação não deve
    ficar buscando a informação no servidor, toda vez que o usuário digitar uma letra.
    Para previnir isto, basta utilizar os operadores DO e DEBOUNCETIME
    */

    /* O operador DISTINCTUNTILCHANGED previne a execução dos métodos caso o termo de busca
    seja igual ao último digitado pelo usuário, com isso otimizando ainda mais o mecanismo
    de busca. */

    this.restaurantsService.restaurants()
      .subscribe(restaurants => this.restaurants = restaurants)
  }

  toogleSearch() {
    this.searchBarState = this.searchBarState === 'hidden' ? 'visible' : 'hidden'
  }

}
