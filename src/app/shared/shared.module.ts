// Exemplo de módulo compartilhado


import { NgModule, ModuleWithProviders } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

// Compartilhando os controles de formulário
import { InputComponent } from './input/input.component'
import { RadioComponent } from './radio/radio.component'
import { RatingComponent } from './rating/rating.component'

// Compartilhando os serviços da app
import { ShoppingCartService } from '../restaurant-details/shopping-cart/shopping-cart.service'
import { RestaurantsService } from '../restaurants/restaurants.service'
import { OrderService } from '../order/order.service'

@NgModule({
    declarations: [
        InputComponent
        , RadioComponent
        , RatingComponent
    ]
    , imports: [
        CommonModule
        , FormsModule
        , ReactiveFormsModule
    ]
    , exports: [
        InputComponent
        , RadioComponent
        , RatingComponent
        , CommonModule
        , FormsModule
        , ReactiveFormsModule
    ]
})
export class SharedModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: SharedModule
            , providers: [
                ShoppingCartService
                , RestaurantsService
                , OrderService
            ]
        }
    }
}