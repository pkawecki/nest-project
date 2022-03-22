import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    const name = 'Johnn ';
    const text = `Hello ${name}`;
    return text;
  }
}
