import { HttpService } from '@nestjs/axios';
import { Injectable, NotFoundException } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class AppService {
  constructor(private readonly httpService: HttpService) {}

  public async GetAllPokemons() {
    const response = await firstValueFrom(
      this.httpService.get('https://pokeapi.co/api/v2/pokemon/'),
    );
    return response;
  }

  public async GetPokemonByName(name: string) {
    try {
      const response = await firstValueFrom(
        this.httpService.get(`https://pokeapi.co/api/v2/pokemon/${name}`),
      );
      if (response.status === 200) {
        const data = response.data;
        const stats = data.stats.map((element: any) => ({
          name: element.stat.name,
          baseStat: element.base_stat,
        }));
        return { name: data.name, stats };
      }
    } catch (error) {
      throw new NotFoundException('no');
    }
  }
  public compareStatHp(pokemon1, pokemon2) {
    if (pokemon1.hpStat < pokemon2.hpStat) {
      const higherHp = pokemon2.name;
      return higherHp;
    } else if (pokemon1.hpStat > pokemon2.hpStat) {
      const higherHp = pokemon1.name;
      return higherHp;
    }
  }
  public compareStatAttack(pokemon1, pokemon2) {
    if (pokemon1.attackStat < pokemon2.attackStat) {
      const higherAttack = pokemon2.name;
      return higherAttack;
    } else if (pokemon1.attackStat > pokemon2.attackStat) {
      const higherAttack = pokemon1.name;
      return higherAttack;
    }
  }
  public compareStatDefense(pokemon1, pokemon2) {
    if (pokemon1.defenseStat < pokemon2.defenseStat) {
      const higherDefense = pokemon2.name;
      return higherDefense;
    } else if (pokemon1.defenseStat > pokemon2.defenseStat) {
      const higherDefense = pokemon1.name;
      return higherDefense;
    }
  }
}
