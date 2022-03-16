import { PokeApiService } from '../../service/poke-api.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'poke-list',
  templateUrl: './poke-list.component.html',
  styleUrls: ['./poke-list.component.css']
})
export class PokeListComponent implements OnInit {

  private setAllPokemons: any;
  public getAllPokemons: any;

  public apiError: boolean = false;

  constructor(private pokeApiService: PokeApiService) { }

  ngOnInit(): void {
    this.carregarPokemons();
  }

  carregarPokemons() {
    this.pokeApiService.getAllPokemons.subscribe(
      result => {
        this.setAllPokemons = result.results;
        this.getAllPokemons = this.setAllPokemons;
        console.log(result);
      },
      error => {
        this.apiError = true;
      }
    )
  }


  public getSearch(value: string) {
    const filter = this.setAllPokemons.filter((result: any) => {
      return !result.name.indexOf(value.toLowerCase());
    });
    this.getAllPokemons = filter;
  }

}
