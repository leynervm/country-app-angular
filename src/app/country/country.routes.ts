import { Routes } from '@angular/router'
import ByCapitalPageComponent from './pages/by-capital-page/by-capital-page.component'
import CountryLayoutComponent from './layouts/countryLayout/countryLayout.component'
import ByCountryPageComponent from './pages/by-country-page/by-country-page.component'
import ByRegionPageComponent from './pages/by-region-page/by-region-page.component'
import CountryPagePageComponent from './pages/country-page-page/country-page-page.component'

export const countryRoutes: Routes = [
  {
    path: '',
    title: 'Country',
    component: CountryLayoutComponent,
    children: [
      {
        path: 'by-capital',
        component: ByCapitalPageComponent
      },
      {
        path: 'by-country',
        component: ByCountryPageComponent
      },
      {
        path: 'by-region',
        component: ByRegionPageComponent
      },
      {
        path: 'by-country/:country',
        component: CountryPagePageComponent
      },
      {
        path: '**',
        redirectTo: 'by-capital'
      }
    ]
  }
]

export default countryRoutes
