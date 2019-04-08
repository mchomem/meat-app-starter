import { Routes } from "@angular/router"
import { HomeComponent } from "./home/home.component"
import { AboutComponent } from './about/about.component'
import { RestaurantsComponent } from './restaurants/restaurants.component'

// Configuração das rotas da aplicação.
export const ROUTES: Routes = [
    {path: '', component: HomeComponent}
    , {path: 'restaurants', component: RestaurantsComponent}
    , {path: 'about', component: AboutComponent}
]