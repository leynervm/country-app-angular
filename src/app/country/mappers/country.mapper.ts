import { Country } from '../interfaces/country.interfaces'
import { RESTCountry } from '../interfaces/rest-countries.interfaces'

export class CountryMapper {
  static mapRestToCountry (item: RESTCountry): Country {
    return {
      cca2: item.cca2,
      flag: item.flag,
      flagSvg: item.flags.svg,
      name: item.translations?.['spa'].common ?? 'No Spanish Name',
      capital: item.capital?.join(','),
      population: item.population,
      region: item.region,
      subregion: item.subregion
    }
  }

  static mapRestToCountries (items: RESTCountry[]): Country[] {
    return items.map(this.mapRestToCountry)
  }
}
