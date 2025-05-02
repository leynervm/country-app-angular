import { Component, computed, input } from '@angular/core'
import { Country } from '../../../interfaces/country.interfaces'
import { CommonModule, DecimalPipe } from '@angular/common'

@Component({
  selector: 'app-country-information',
  imports: [CommonModule, DecimalPipe],
  templateUrl: './country-information.component.html'
})
export default class CountryInformationComponent {
  country = input.required<Country>()
  currentyear = computed(() => {
    return new Date().getFullYear()
  })
}
