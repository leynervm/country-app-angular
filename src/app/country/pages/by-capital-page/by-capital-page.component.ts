import { Component, inject, resource, signal } from '@angular/core'
import CountryListComponent from '../../components/country-list/country-list.component'
import CountrySearchInputComponent from '../../components/country-search-input/country-search-input.component'
import { CountryService } from '../../services/country.service'
import { firstValueFrom } from 'rxjs'

@Component({
  selector: 'app-by-capital-page',
  imports: [CountryListComponent, CountrySearchInputComponent],
  templateUrl: './by-capital-page.component.html'
})
export default class ByCapitalPageComponent {
  countryService = inject(CountryService)
  query = signal<string>('')

  countryResource = resource({
    request: () => ({ query: this.query() }),
    loader: async ({ request }) => {
      if (request.query == '') return

      return await firstValueFrom(
        this.countryService.searchByCapital(request.query)
      )
    }
  })
  // isLoading = signal<boolean>(false)
  // isError = signal<string | null>(null)
  // countries = signal<Country[]>([])

  // onSearchCapital (query: string) {
  //   if (this.isLoading()) return

  //   this.isLoading.set(true)
  //   this.isError.set(null)

  //   this.countryService.searchByCapital(query).subscribe({
  //     next: countries => {
  //       this.isLoading.set(false)
  //       this.countries.set(countries)
  //       console.log(countries)
  //     },
  //     error: err => {
  //       this.isLoading.set(false)
  //       this.countries.set([])
  //       this.isError.set(err)
  //     }
  //   })
  // }
}
