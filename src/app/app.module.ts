import { BrowserModule } from '@angular/platform-browser';

// O Token LOCALE_ID servirá para ajuste de localização de moeda brasileira para a app.
import { NgModule , LOCALE_ID} from '@angular/core';
import { HttpModule } from '@angular/http';
import { RouterModule, PreloadAllModules } from '@angular/router'; // PreloadAllModules permite utilizar a estratégia de pre-loading do Angular
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations' // Permitir capacidade de animação ao app

import { ROUTES } from './app.routes'

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { RestaurantsComponent } from './restaurants/restaurants.component';
import { RestaurantComponent } from './restaurants/restaurant/restaurant.component'
import { RestaurantDetailsComponent } from './restaurant-details/restaurant-details.component';
import { MenuComponent } from './restaurant-details/menu/menu.component';
import { ShoppingCartComponent } from './restaurant-details/shopping-cart/shopping-cart.component';
import { MenuItemComponent } from './restaurant-details/menu-item/menu-item.component';
import { ReviewsComponent } from './restaurant-details/reviews/reviews.component'
import { OrderSummaryComponent } from './order-summary/order-summary.component';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    RestaurantsComponent,
    RestaurantComponent,
    RestaurantDetailsComponent,
    MenuComponent,
    ShoppingCartComponent,
    MenuItemComponent,
    ReviewsComponent,
    OrderSummaryComponent,
  ],
  imports: [
    BrowserModule
    , BrowserAnimationsModule // Permitir capacidade de animação ao app
    , HttpModule
    , SharedModule.forRoot()

    /* Acrescentar a função forRoot() passando a constante ROUTES criada no arquivo app.routes.ts para configurar as rotas da aplicação. */
    , RouterModule.forRoot(ROUTES, {preloadingStrategy: PreloadAllModules})
  ],
  providers: [    
    { provide: LOCALE_ID, useValue: 'pt-BR' } // Acrescentar esta configuração para ajustar a localização da aplicação.
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
