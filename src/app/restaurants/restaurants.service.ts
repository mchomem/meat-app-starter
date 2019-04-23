import { Injectable } from '@angular/core'
import { Http } from '@angular/http'
import { Observable } from 'rxjs/observable'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch'
import { Restaurant } from "./restaurant/restaurant.model";
import { MEAT_API } from '../app.api'
import { ErrorHandler } from '../app.error-handler'
import { MenuItem } from '../restaurant-details/menu-item/menu-item.model'

@Injectable()
export class RestaurantsService {

    constructor(private http: Http) { }

    restaurants(search?: string): Observable<Restaurant[]> {
        /* O json-server tem um bom suporte a testes para simular ambientes de produção.
        Neste caso, como precisamos que seja passado um parâmetro opcional para o seu
        provider de dados, é possível utilizar um parâmetro "q" que servira de busca genérica,
        ou seja, o usuário irá digitar qualquer valor e esse valor será comparado com os atributos
        de restaurant */
        return this.http.get(`${MEAT_API}/restaurants`, {params: {q: search}})
            .map(response => response.json())
            .catch(ErrorHandler.handlerError)
    }

    restaurantById(id: string): Observable<Restaurant> {
        return this.http.get(`${MEAT_API}/restaurants/${id}`)
            .map(respose => respose.json())
            .catch(ErrorHandler.handlerError)
    }

    reviewsOfRestaurant(id: string): Observable<any> {
        return this.http.get(`${MEAT_API}/restaurants/${id}/reviews`)
            .map(respose => respose.json())
            .catch(ErrorHandler.handlerError)
    }

    menuOfRestaurant(id: string): Observable<MenuItem[]> {
        return this.http.get(`${MEAT_API}/restaurants/${id}/menu`)
        .map(respose => respose.json())
        .catch(ErrorHandler.handlerError)
    }

}