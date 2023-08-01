import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { AuthGuard } from './guard/auth/auth.guard';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { FoodModule } from './food/food.module';
import { AdminModule } from './admin/admin.module';
import { JwtService } from '@nestjs/jwt';
import { APP_GUARD } from '@nestjs/core';
import { AuthService } from './auth/auth.service';
import { UploadModule } from './upload/upload.module';

@Module({
  imports: [
    ConfigModule.forRoot({isGlobal:true}),
    MongooseModule.forRoot(`mongodb+srv://jat_121:Jatin4474@cluster0.hduwkrd.mongodb.net/?retryWrites=true&w=majority`),
    FoodModule,
    AdminModule,
    UploadModule,
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService, AuthGuard, JwtService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    }],
})
export class AppModule {}
