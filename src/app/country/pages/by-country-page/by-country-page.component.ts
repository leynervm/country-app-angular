import { Component, inject, resource, signal } from '@angular/core'
import CountrySearchInputComponent from '../../components/country-search-input/country-search-input.component'
import CountryListComponent from '../../components/country-list/country-list.component'
import { firstValueFrom, of } from 'rxjs'
import { CountryService } from '../../services/country.service'
import { rxResource } from '@angular/core/rxjs-interop'

@Component({
  selector: 'app-by-country-page',
  imports: [CountrySearchInputComponent, CountryListComponent],
  templateUrl: './by-country-page.component.html'
})
export default class ByCountryPageComponent {
  countryService = inject(CountryService)
  search = signal<string>('')

  // Usando rxResource
  countryResource = rxResource({
    request: () => ({ search: this.search() }),
    loader: ({ request }) => {
      if (request.search == '') return of([])

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
