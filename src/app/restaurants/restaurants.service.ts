import { Injectable } from '@angular/core'
import { Http } from '@angular/http'
import { Observable } from 'rxjs/observable'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch'
import { Restaurant } from "./restaurant/restaurant.model";
import { MEET_API } from '../app.api'
import { ErrorHandler } from '../app.error-handler'
import { MenuItem } from '../restaurant-details/menu-item/menu-item.model'

@Injectable()
export class RestaurantsService {

    constructor(private http: Http) { }

    restaurants(): Observable<Restaurant[]> {
        return this.http.get(`${MEET_API}/restaurants`)
            .map(response => response.json())
            .catch(ErrorHandler.handlerError)
    }

    restaurantById(id: string): Observable<Restaurant> {
        return this.http.get(`${MEET_API}/restaurants/${id}`)
            .map(respose => respose.json())
            .catch(ErrorHandler.handlerError)
    }

    reviewsOfRestaurant(id: string): Observable<any> {
        return this.http.get(`${MEET_API}/restaurants/${id}/reviews`)
            .map(respose => respose.json())
            .catch(ErrorHandler.handlerError)
    }

    menuOfRestaurant(id: string): Observable<MenuItem[]> {
        return this.http.get(`${MEET_API}/restaurants/${id}/menu`)
        .map(respose => respose.json())
        .catch(ErrorHandler.handlerError)
    }

}