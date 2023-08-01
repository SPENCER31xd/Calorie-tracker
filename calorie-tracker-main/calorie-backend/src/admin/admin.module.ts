import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthService } from '../auth/auth.service';
import { UserSchema } from '../auth/schemas/user.schema';
import { FoodService } from '../food/food.service';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';

@Module({
  imports: [MongooseModule.forFeature([{name:'users', schema: UserSchema}])],
  controllers: [AdminController],
  providers: [AdminService, FoodService, JwtService, AuthService]
})
export class AdminModule {}
