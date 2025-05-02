import { Component, input, output } from '@angular/core'

@Component({
  selector: 'app-country-search-input',
  imports: [],
  templateUrl: './country-search-input.component.html'
})
export default class CountrySearchInputComponent {
  placeholder = input<string>('Buscar')
  search = output<string>()
  onSearch (query: string) {
    // if (query.trim() == '') return
    this.search.emit(query)
  }
}
