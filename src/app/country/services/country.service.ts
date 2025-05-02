import { HttpClient } from '@angular/common/http'
import { inject, Injectable } from '@angular/core'
import { RESTCountry } from '../interfaces/rest-countries.interfaces'
import { catchError, delay, map, Observable, throwError } from 'rxjs'
import { Country } from '../interfaces/country.interfaces'
import { CountryMapper } from '../mappers/country.mapper'

const API_URL = 'https://restcountries.com/v3.1'

@Injectable({
  providedIn: 'root'
})
export class CountryService {
  constructor () {}

  private http = inject(HttpClient)

  searchByCapital (query: string): Observable<Country[]> {
    const capital = query.toLowerCase()
    return this.http.get<RESTCountry[]>(`${API_URL}/capital/${capital}`).pipe(
      map(items => CountryMapper.mapRestToCountries(items)),
      catchError(error => {
        return throwError(
          () => new Error(`No se encontró un país con la capital : ${capital}`)
        )
      })
    )
  }

  searchByCountry (query: string): Observable<Country[]> {
    const pais = query.toLowerCase()
    return this.http.get<RESTCountry[]>(`${API_URL}/name/${pais}`).pipe(
      map(items => CountryMapper.mapRestToCountries(items)),
      delay(2000),
      catchError(error => {
        return throwError(
          () => new Error(`No se encontró un país con el nombre : ${pais}`)
        )
      })
    )
  }
}
