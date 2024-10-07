import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Policyholders } from './entities/policyholders.entity';
import { PolicyholdersModule } from './policyholders/policyholders.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      autoLoadEntities: true,
      database: 'mydb.sql',
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Policyholders]),
    PolicyholdersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
