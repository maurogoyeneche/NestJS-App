import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { firstValueFrom } from 'rxjs/internal/firstValueFrom';

@Controller()
export class AppController {
  constructor(private appService: AppService) {}

  @Get()
  async GetAllCharacters(): Promise<any> {
    const { data } = await firstValueFrom(
      await this.appService.getAllCharacters(),
    );
    console.log(data);
  }
}
