import { Component, inject } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { CountryService } from '../../services/country.service'
import { rxResource } from '@angular/core/rxjs-interop'
import NotFoundComponent from '../../../shared/components/not-found/not-found.component'
import CountryInformationComponent from './country-information/country-information.component'
import LoadingComponent from '../../../shared/components/loading/loading.component'

@Component({
  selector: 'app-country-page-page',
  imports: [NotFoundComponent, CountryInformationComponent, LoadingComponent],
  templateUrl: './country-page-page.component.html'
})
export default class CountryPagePageComponent {
  countryService = inject(CountryService)
  query = inject(ActivatedRoute).snapshot.params['country']
  // query = inject(ActivatedRoute).snapshot.paramMap.get('country')

  countryResource = rxResource({
    request: () => ({ code: this.query }),
    loader: ({ request }) => {
      return this.countryService.searchCountryByAlphaCode(request.code)
    }
  })
}
