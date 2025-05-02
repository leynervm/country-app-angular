import { Component, inject } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { toSignal } from '@angular/core/rxjs-interop'
import { map } from 'rxjs'

@Component({
  selector: 'app-country-page-page',
  imports: [],
  templateUrl: './country-page-page.component.html'
})
export default class CountryPagePageComponent {
  query = toSignal(
    inject(ActivatedRoute).params.pipe(map(params => params['country']))
  )
}
