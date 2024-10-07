import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PolicyholdersService } from './policyholders/policyholders.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const policyHolderSvc = app.get(PolicyholdersService);
  await policyHolderSvc.seed();
  await app.listen(3000);
}
bootstrap();
