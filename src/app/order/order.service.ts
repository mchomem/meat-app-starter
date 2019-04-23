import { Injectable } from "@angular/core"
import { ShoppingCartService } from "../restaurant-details/shopping-cart/shopping-cart.service"
import { CartItem } from "../restaurant-details/shopping-cart/cart-item.model"
import { HttpClient } from '@angular/common/http'
import { Observable } from "rxjs/Observable"
import { Order, OrderItem } from "./order.model"
import { MEAT_API } from '../app.api'

@Injectable()
export class OrderService {
    constructor(private cartService: ShoppingCartService, private http: HttpClient) {}

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
        return this.http.post<Order>(`${MEAT_API}/orders`, order)
            .map(order => order.id)
    }    
}