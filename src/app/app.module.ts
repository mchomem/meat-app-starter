import { BrowserModule } from '@angular/platform-browser'

import { NgModule, LOCALE_ID, ErrorHandler } from '@angular/core' // O Token LOCALE_ID servirá para ajuste de localização de moeda brasileira para a app.
import { HttpClientModule } from '@angular/common/http'
import { RouterModule, PreloadAllModules } from '@angular/router' // PreloadAllModules permite utilizar a estratégia de pre-loading do Angular
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations' // Permitir capacidade de animação ao app

/* O import de LocationStrategy e HashLocationStrategy permite utilizar a estratégia de # (hash) na app
   Isso evita o problema que ocorre somente em produção, pois se o usuário tentar acessar uma parte da
   aplicação, fazendo uso de uma url (copiado nos favoritos por exemplo), dentro de um servidor padrão,
   o mesmo irá retornar 404.
   Isso ocorre somente em produção, pois em DEV o Angular ao não encontrar a url solicitada (das rotas),
   chama index.html (que carrega todos os outros scripts e recursos), analisa a url solicitada pelo browser
   e a redireciona, o que não ocorre no servidor padrão.
*/
import { LocationStrategy, HashLocationStrategy } from '@angular/common'

import { ROUTES } from './app.routes'

import { AppComponent } from './app.component'
import { HeaderComponent } from './header/header.component'
import { HomeComponent } from './home/home.component'
import { RestaurantsComponent } from './restaurants/restaurants.component'
import { RestaurantComponent } from './restaurants/restaurant/restaurant.component'
import { RestaurantDetailsComponent } from './restaurant-details/restaurant-details.component'
import { MenuComponent } from './restaurant-details/menu/menu.component'
import { ShoppingCartComponent } from './restaurant-details/shopping-cart/shopping-cart.component'
import { MenuItemComponent } from './restaurant-details/menu-item/menu-item.component'
import { ReviewsComponent } from './restaurant-details/reviews/reviews.component'
import { OrderSummaryComponent } from './order-summary/order-summary.component'
import { SharedModule } from './shared/shared.module'
import { NotFoundComponent } from './not-found/not-found.component'
import { LoginComponent } from './security/login/login.component'
import { UserDetailComponent } from './header/user-detail/user-detail.component'
import { ApplicationErrorHandler } from './app.error-handler'

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
        NotFoundComponent,
        LoginComponent,
        UserDetailComponent,
    ],
    imports: [
        BrowserModule
        , BrowserAnimationsModule // Permitir capacidade de animação ao app
        , HttpClientModule
        , SharedModule.forRoot()

        /* Acrescentar a função forRoot() passando a constante ROUTES criada no arquivo app.routes.ts para configurar as rotas da aplicação. */
        , RouterModule.forRoot(ROUTES, { preloadingStrategy: PreloadAllModules })
    ],
    providers: [
        { provide: LocationStrategy, useClass: HashLocationStrategy } // Permite o uso da estratégia de navegação com o paradigma hash.
        , { provide: LOCALE_ID, useValue: 'pt-BR' } // Acrescentar esta configuração para ajustar a localização da aplicação.
        , { provide: ErrorHandler, useClass: ApplicationErrorHandler }
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
