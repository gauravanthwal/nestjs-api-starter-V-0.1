import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  hellowFromMyRoute() {
    return { message: 'hello from my route', success: true, error: false };
  }
}
