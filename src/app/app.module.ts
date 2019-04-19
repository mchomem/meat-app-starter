import { BrowserModule } from '@angular/platform-browser';

// O Token LOCALE_ID servirá para ajuste de localização de moeda brasileira para a app.
import { NgModule , LOCALE_ID} from '@angular/core';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { FormsModule} from '@angular/forms'

import { ROUTES } from './app.routes'

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { RestaurantsComponent } from './restaurants/restaurants.component';
import { RestaurantComponent } from './restaurants/restaurant/restaurant.component'
import { RestaurantsService } from './restaurants/restaurants.service';
import { RestaurantDetailsComponent } from './restaurant-details/restaurant-details.component';
import { MenuComponent } from './restaurant-details/menu/menu.component';
import { ShoppingCartComponent } from './restaurant-details/shopping-cart/shopping-cart.component';
import { MenuItemComponent } from './restaurant-details/menu-item/menu-item.component';
import { ReviewsComponent } from './restaurant-details/reviews/reviews.component'
import { ShoppingCartService } from './restaurant-details/shopping-cart/shopping-cart.service';
import { OrderComponent } from './order/order.component';
import { InputComponent } from './shared/input/input.component';
import { RadioComponent } from './shared/radio/radio.component';
import { OrderItemsComponent } from './order/order-items/order-items.component';
import { OrderService } from './order/order.service';
import { DeliveryCostsComponent } from './order/delivery-costs/delivery-costs.component';
import { OrderSummaryComponent } from './order-summary/order-summary.component';
import { RatingComponent } from './shared/rating/rating.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    AboutComponent,
    RestaurantsComponent,
    RestaurantComponent,
    RestaurantDetailsComponent,
    MenuComponent,
    ShoppingCartComponent,
    MenuItemComponent,
    ReviewsComponent,
    OrderComponent,
    InputComponent,
    RadioComponent,
    OrderItemsComponent,
    DeliveryCostsComponent,
    OrderSummaryComponent,
    RatingComponent
  ],
  imports: [
    BrowserModule
    , HttpModule
    , FormsModule
    , RouterModule.forRoot(ROUTES) // Acrescentar a função forRoot() passando a constante ROUTES criada no arquivo app.routes.ts para configurar as rotas da aplicação.
  ],
  providers: [
    RestaurantsService
    , ShoppingCartService
    , OrderService
    , { provide: LOCALE_ID, useValue: 'pt-BR' } // Acrescentar esta configuração para ajustar a localização da aplicação.
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
