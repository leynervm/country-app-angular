import { Component, input } from '@angular/core'
import { Country } from '../../interfaces/country.interfaces'
import { DecimalPipe } from '@angular/common'
import { RouterLink } from '@angular/router'
import LoadingComponent from '../../../shared/components/loading/loading.component'

@Component({
  selector: 'app-country-list',
  imports: [DecimalPipe, RouterLink, LoadingComponent],
  templateUrl: './country-list.component.html'
})
export default class CountryListComponent {
  countries = input.required<Country[]>()

  errorMessage = input<string | unknown | null>()
  isLoading = input<boolean>(false)
  isEmpty = input<boolean>(false)
}
