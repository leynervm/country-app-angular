import { HttpClient } from '@angular/common/http'
import { inject, Injectable } from '@angular/core'
import { RESTCountry } from '../interfaces/rest-countries.interfaces'
import { catchError, delay, map, Observable, of, tap, throwError } from 'rxjs'
import { Country } from '../interfaces/country.interfaces'
import { CountryMapper } from '../mappers/country.mapper'
import { Region } from '../interfaces/region.interfaces'

const API_URL = 'https://restcountries.com/v3.1'

@Injectable({
  providedIn: 'root'
})
export class CountryService {
  constructor () {}

  private http = inject(HttpClient)
  private queryCacheCapital = new Map<string, Country[]>()
  private queryCacheCountry = new Map<string, Country[]>()
  private queryCacheRegion = new Map<Region, Country[]>()

  searchByCapital (query: string): Observable<Country[]> {
    const capital = query.toLowerCase()

    if (this.queryCacheCapital.has(capital)) {
      return of(this.queryCacheCapital.get(capital) ?? [])
    }

    console.log('Llegando al servidor')
    return this.http.get<RESTCountry[]>(`${API_URL}/capital/${capital}`).pipe(
      map(items => CountryMapper.mapRestToCountries(items)),
      tap(countries => this.queryCacheCapital.set(capital, countries)),
      catchError(error => {
        return throwError(
          () => new Error(`No se encontró un país con la capital : ${capital}`)
        )
      })
    )
  }

  searchByCountry (query: string): Observable<Country[]> {
    const pais = query.toLowerCase()

    if (this.queryCacheCountry.has(pais)) {
      return of(this.queryCacheCountry.get(pais) ?? [])
    }

    console.log('Llegando al servidor')
    return this.http.get<RESTCountry[]>(`${API_URL}/name/${pais}`).pipe(
      map(items => CountryMapper.mapRestToCountries(items)),
      tap(countries => this.queryCacheCountry.set(pais, countries)),
      // delay(2000),
      catchError(error => {
        return throwError(
          () => new Error(`No se encontró un país con el nombre : ${pais}`)
        )
      })
    )
  }

  searchCountryByAlphaCode (code: string) {
    const codeAlpha = code.toUpperCase()
    return this.http.get<RESTCountry[]>(`${API_URL}/alpha/${codeAlpha}`).pipe(
      map(res => CountryMapper.mapRestToCountries(res)),
      map(countries => countries.at(0)),
      catchError(error => {
        return throwError(
          () => new Error(`No se encontró un país con el código : ${codeAlpha}`)
        )
      })
    )
  }

  searchCountryByRegion (region: Region): Observable<Country[]> {
    if (this.queryCacheRegion.has(region)) {
      return of(this.queryCacheRegion.get(region) ?? [])
    }

    return this.http.get<RESTCountry[]>(`${API_URL}/region/${region}`).pipe(
      map(res => CountryMapper.mapRestToCountries(res)),
      tap(countries => this.queryCacheRegion.set(region, countries)),
      catchError(error => {
        return throwError(
          () => new Error(`No se encontraron países con la región : ${region}`)
        )
      })
    )
  }
}
