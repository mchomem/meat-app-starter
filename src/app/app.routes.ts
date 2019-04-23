import { Routes } from '@angular/router'
import { HomeComponent } from './home/home.component'
import { RestaurantsComponent } from './restaurants/restaurants.component'
import { RestaurantDetailsComponent } from './restaurant-details/restaurant-details.component'
import { MenuComponent } from './restaurant-details/menu/menu.component'
import { ReviewsComponent } from './restaurant-details/reviews/reviews.component'
import { OrderSummaryComponent } from './order-summary/order-summary.component'
import { NotFoundComponent } from './not-found/not-found.component'

// Configuração das rotas da aplicação.
export const ROUTES: Routes = [

    // Dica: em geral as regras de rotas mais específicas são listadas primeiro e as mais genéricas mais em baixo!

    {path: '', component: HomeComponent} // Navegação padrão
    , {path: 'restaurants', component: RestaurantsComponent}
    , {path: 'restaurants/:id', component: RestaurantDetailsComponent, 
        // Regra de navegação (rota) entre elementos filhos
        children: [
            {path: '', redirectTo: 'menu', pathMatch: 'full'} // Navegação padrão no componentes filhos.
            , {path: 'menu', component: MenuComponent}
            , {path: 'reviews', component: ReviewsComponent}
        ]}
    , {path: 'order', loadChildren: './order/order.module#OrderModule'}
    , {path: 'order-summary', component: OrderSummaryComponent}
    , {path: 'about', loadChildren: './about/about.module#AboutModule'} // Ao invés de carregar o componente, carrega o módulo dele
    
    /* Regra para página 404, utilizando rota com Wildcard, deve ficar sempre no final da regra, pois o mecanismo do Angular busca as rotas mais específicas primeiro */
    , {path: '**' , component: NotFoundComponent}
]