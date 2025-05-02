import { Routes } from '@angular/router'
import CountryLayoutComponent from './country/layouts/countryLayout/countryLayout.component'
import HomePageComponent from './shared/pages/home-page/home-page.component'

export const routes: Routes = [
  {
    path: '',
    title: 'Inicio',
    component: HomePageComponent
  },
  {
    path: 'country',
    title: 'Country',
    loadChildren: () => import('../app/country/country.routes')
  },
  {
    path: '**',
    redirectTo: ''
  }
]
