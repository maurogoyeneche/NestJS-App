import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('pokemon')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/:name')
  public async getPokemon(@Param('name') name: string) {
    const pokemon = await this.appService.GetPokemonByName(name);
    return pokemon;
  }

  @Get('/:name1/:name2')
  public async getComparePokemon(@Param('name1') name1, @Param('name2') name2) {
    const pokemon1 = await this.appService.GetPokemonByName(name1);
    const pokemon2 = await this.appService.GetPokemonByName(name2);
    const statPoke1 = {
      name: pokemon1.name,
      hpStat: pokemon1.stats.find((stat) => stat.name === 'hp').baseStat,
      attackStat: pokemon1.stats.find((stat) => stat.name === 'attack')
        .baseStat,
      defenseStat: pokemon1.stats.find((stat) => stat.name === 'defense')
        .baseStat,
    };
    const statPoke2 = {
      name: pokemon2.name,
      hpStat: pokemon2.stats.find((stat) => stat.name === 'hp').baseStat,
      attackStat: pokemon2.stats.find((stat) => stat.name === 'attack')
        .baseStat,
      defenseStat: pokemon2.stats.find((stat) => stat.name === 'defense')
        .baseStat,
    };
    const higherHp = this.appService.compareStatHp(statPoke1, statPoke2);
    const higherAttack = this.appService.compareStatAttack(
      statPoke1,
      statPoke2,
    );
    const higherDefense = this.appService.compareStatDefense(
      statPoke1,
      statPoke2,
    );

    return {
      higherHp,
      higherAttack,
      higherDefense,
    };
  }
}
