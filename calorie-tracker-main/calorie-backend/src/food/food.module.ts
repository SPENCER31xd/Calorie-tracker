import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from '../auth/schemas/user.schema';
import { FoodController } from './food.controller';
import { FoodService } from './food.service';

@Module({
  imports: [MongooseModule.forFeature([{name:'users', schema: UserSchema}])],
  controllers: [FoodController],
  providers: [FoodService]
})
export class FoodModule {}
