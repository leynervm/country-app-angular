import {
  Component,
  inject,
  linkedSignal,
  resource,
  signal
} from '@angular/core'
import CountrySearchInputComponent from '../../components/country-search-input/country-search-input.component'
import CountryListComponent from '../../components/country-list/country-list.component'
import { firstValueFrom, of } from 'rxjs'
import { CountryService } from '../../services/country.service'
import { rxResource } from '@angular/core/rxjs-interop'
import { ActivatedRoute, Router } from '@angular/router'

@Component({
  selector: 'app-by-country-page',
  imports: [CountrySearchInputComponent, CountryListComponent],
  templateUrl: './by-country-page.component.html'
})
export default class ByCountryPageComponent {
  countryService = inject(CountryService)
  activatedRoute = inject(ActivatedRoute)
  router = inject(Router)

  queryParam = this.activatedRoute.snapshot.queryParamMap.get('query') ?? ''

  search = linkedSignal<string>(() => this.queryParam)

  // Usando rxResource
  countryResource = rxResource({
    request: () => ({ search: this.search() }),
    loader: ({ request }) => {
      if (request.search == '') return of([])
      this.router.navigate(['/country/by-country'], {
        queryParams: {
          query: request.search
        }
      })
      return this.countryService.searchByCountry(request.search)
    }
  })

  // Usando resource
  // countryResource = resource({
  //   request: () => ({ search: this.search() }),
  //   loader: async ({ request }) => {
  //     if (request.search == '') return

  //     return await firstValueFrom(
  //       this.countryService.searchByCountry(request.search)
  //     )
  //   }
  // })
}
