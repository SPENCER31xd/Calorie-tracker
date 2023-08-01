import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import {MongooseModule} from '@nestjs/mongoose'
import { UserSchema } from './schemas/user.schema';
import { JwtModule } from '@nestjs/jwt/dist';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'users', schema: UserSchema }]),
    JwtModule.register({ secret: 'priyanshubhardwaj' })
  ],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}
