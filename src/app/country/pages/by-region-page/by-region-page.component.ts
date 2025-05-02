import { Component, inject, input, linkedSignal, signal } from '@angular/core'
import CountryListComponent from '../../components/country-list/country-list.component'
import { rxResource } from '@angular/core/rxjs-interop'
import { CountryService } from '../../services/country.service'
import { Region } from '../../interfaces/region.interfaces'
import { of } from 'rxjs'
import { ActivatedRoute, Router } from '@angular/router'

function validateQueryParam (queryParam: string): Region {
  queryParam = queryParam.toLowerCase()
  const validRegions: Record<string, Region> = {
    Africa: 'Africa',
    Americas: 'Americas',
    Asia: 'Asia',
    Europe: 'Europe',
    Oceania: 'Oceania',
    Antarctic: 'Antarctic'
  }

  return validRegions[queryParam] ?? 'Americas'
}

@Component({
  selector: 'app-by-region-page',
  imports: [CountryListComponent],
  templateUrl: './by-region-page.component.html'
})
export default class ByRegionPageComponent {
  public regions: Region[] = [
    'Africa',
    'Americas',
    'Asia',
    'Europe',
    'Oceania',
    'Antarctic'
  ]
  countryService = inject(CountryService)
  activatedRoute = inject(ActivatedRoute)
  router = inject(Router)

  queryParam = this.activatedRoute.snapshot.queryParamMap.get('region') ?? ''

  region = linkedSignal<Region | null>(() =>
    validateQueryParam(this.queryParam)
  )

  countryResource = rxResource({
    request: () => ({ region: this.region() }),
    loader: ({ request }) => {
      if (!request.region) return of([])
      this.router.navigate(['/country/by-region'], {
        queryParams: {
          region: request.region
        }
      })
      return this.countryService.searchCountryByRegion(request.region)
    }
  })
}
