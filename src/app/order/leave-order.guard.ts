import { CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router'
import { OrderComponent } from './order.component'
import { Observable } from 'rxjs/Observable'

export class LeaveOrderGuard implements CanDeactivate<OrderComponent> {

    constructor() {

    }

    canDeactivate(orderComponent: OrderComponent
        , currentRoute: ActivatedRouteSnapshot
        , currentState: RouterStateSnapshot): boolean {

        if (!orderComponent.isOrderCompleted()) {
            return window.confirm('Deseja desistir da compra?')
        } else {
            return true
        }
    }

}