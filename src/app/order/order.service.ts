import { Injectable } from "@angular/core"
import { ShoppingCartService } from "../restaurant-details/shopping-cart/shopping-cart.service"
import { CartItem } from "../restaurant-details/shopping-cart/cart-item.model"
import { Http, Headers, RequestOptions } from '@angular/http'
import { Observable } from "rxjs/Observable"
import { Order, OrderItem } from "./order.model"
import { MEAT_API } from '../app.api'

@Injectable()
export class OrderService {
    constructor(private cartService: ShoppingCartService, private http: Http) {}

    itemsValue(): number {
        return this.cartService.total()
    }

    cartItems(): CartItem[] {
        return this.cartService.items
    }

    increaseQty(item: CartItem) {
        this.cartService.increaseQty(item)
    }

    drecreaseQty(item: CartItem) {
        this.cartService.drecreaseQty(item)
    }

    remove(item: CartItem) {
        this.cartService.removeItem(item)
    }

    clear() {
        this.cartService.clear()
    }

    checkOrder(order: Order): Observable<string> {
        const headers = new Headers()
        headers.append('Content-Type', 'application/json')
        return this.http
            .post(`${MEAT_API}/orders`, JSON.stringify(order), new RequestOptions({ headers: headers }))
            .map(response => response.json())
            .map(order => order.id)
    }

    
}