import { Routes } from '@angular/router'
import { HomeComponent } from './home/home.component'
import { AboutComponent } from './about/about.component'
import { RestaurantsComponent } from './restaurants/restaurants.component'
import { RestaurantDetailsComponent } from './restaurant-details/restaurant-details.component'
import { MenuComponent } from './restaurant-details/menu/menu.component'
import { ReviewsComponent } from './restaurant-details/reviews/reviews.component'

// Configuração das rotas da aplicação.
export const ROUTES: Routes = [
    {path: '', component: HomeComponent} // Navegação padrão
    , {path: 'restaurants', component: RestaurantsComponent}
    , {path: 'restaurants/:id', component: RestaurantDetailsComponent, 
        // Regra de navegação (rota) entre elementos filhos
        children: [
            {path: '', redirectTo: 'menu', pathMatch: 'full'} // Navegação padrão no componentes filhos.
            , {path: 'menu', component: MenuComponent}
            , {path: 'reviews', component: ReviewsComponent}
        ]}
    , {path: 'about', component: AboutComponent}
]