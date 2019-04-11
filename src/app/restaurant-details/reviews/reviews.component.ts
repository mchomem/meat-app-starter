import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import { RestaurantsService } from '../../restaurants/restaurants.service'
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'mt-reviews',
  templateUrl: './reviews.component.html'
})
export class ReviewsComponent implements OnInit {

  // Utilizar o pipe do AngularJS ao invés de utilizar subscribe
  reviews: Observable<any>

  constructor(private restaurantsService: RestaurantsService, private route: ActivatedRoute) { }

  ngOnInit() {
    // Por se tratar de um parâmetro (id) de uma rota pai deve-se buscar então a rota do componente pai para se utilizar aqui
    this.reviews = this.restaurantsService
      .reviewsOfRestaurant(this.route.parent.snapshot.params['id'])

  }

}
