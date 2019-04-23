import { Injectable } from '@angular/core'
import { HttpClient, HttpParams } from '@angular/common/http'
import { Observable } from 'rxjs/observable'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch'
import { Restaurant } from "./restaurant/restaurant.model";
import { MEAT_API } from '../app.api'
import { ErrorHandler } from '../app.error-handler'
import { MenuItem } from '../restaurant-details/menu-item/menu-item.model'

@Injectable()
export class RestaurantsService {

    constructor(private http: HttpClient) { }

    restaurants(search?: string): Observable<Restaurant[]> {
        /* O json-server tem um bom suporte a testes para simular ambientes de produção.
        Neste caso, como precisamos que seja passado um parâmetro opcional para o seu
        provider de dados, é possível utilizar um parâmetro "q" que servira de busca genérica,
        ou seja, o usuário irá digitar qualquer valor e esse valor será comparado com os atributos
        de restaurant */
        let params: HttpParams = undefined
        if(search) {
            params = new HttpParams().append('q', search)
        }
        return this.http.get<Restaurant[]>(`${MEAT_API}/restaurants`, {params: params})
    }

    restaurantById(id: string): Observable<Restaurant> {
        return this.http.get<Restaurant>(`${MEAT_API}/restaurants/${id}`)
    }

    reviewsOfRestaurant(id: string): Observable<any> {
        return this.http.get<any>(`${MEAT_API}/restaurants/${id}/reviews`)
    }

    menuOfRestaurant(id: string): Observable<MenuItem[]> {
        return this.http.get<MenuItem[]>(`${MEAT_API}/restaurants/${id}/menu`)
    }

}