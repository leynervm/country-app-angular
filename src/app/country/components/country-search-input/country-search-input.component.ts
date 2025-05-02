import {
  Component,
  effect,
  input,
  linkedSignal,
  output,
  signal
} from '@angular/core'

@Component({
  selector: 'app-country-search-input',
  imports: [],
  templateUrl: './country-search-input.component.html'
})
export default class CountrySearchInputComponent {
  search = output<string>()
  placeholder = input<string>('Buscar')
  debounceTime = input(300)

  initialValue = input<string>()

  // linkedSignal: Para que sea inicializado con una señal co valor
  inputValue = linkedSignal<string>(() => this.initialValue() ?? '')

  debounceEffect = effect(onCleanup => {
    const value = this.inputValue()

    const timeout = setTimeout(() => {
      this.search.emit(value)
    }, this.debounceTime())

    onCleanup(() => {
      clearTimeout(timeout)
    })
  })
}
