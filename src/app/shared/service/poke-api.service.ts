import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PokeApiService {

  private apiUrl = "https://pokeapi.co/api/v2/pokemon/?offset=0&limit=151/"

  constructor(
    private httpClient: HttpClient
  ) { }

  public apiGetPokemon(url: string):Observable<any> {
    return this.httpClient.get<any>(url).pipe(
      map(
        res => res
      )
    )
  }

  get getAllPokemons():Observable<any>{
    return this.httpClient.get<any>(this.apiUrl).pipe(
      tap( res => res ),
      tap(res => {
        res.results.map(
          (resPokemons: any) => {
            this.apiGetPokemon(resPokemons.url).subscribe(
              res => resPokemons.status = res
            );
        })
      })
    );
  }
}
