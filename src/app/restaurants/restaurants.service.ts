import { Injectable } from '@angular/core'
import { Http } from '@angular/http'
import { Observable } from 'rxjs/observable'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch'
import { Restaurant } from "./restaurant/restaurant.model";
import { MEET_API } from '../app.api'
import { ErrorHandler } from '../app.error-handler'

@Injectable()
export class RestaurantsService {

    constructor(private http: Http) {}

    restaurants(): Observable<Restaurant[]> {
        return this.http.get(`${MEET_API}/restaurants`)
            .map(response => response.json())
            .catch(ErrorHandler.handlerError)
    }

}