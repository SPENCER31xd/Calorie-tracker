import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { registerUserDto } from '../../../auth/dtos/registerUser.dto';

@Injectable()
export class HashPasswordPipe implements PipeTransform {
  async transform(value: registerUserDto, metadata: ArgumentMetadata) {
    // const hashPassword = await bcrypt.hash(value.password, 10);
    // return {...value,password:hashPassword}
  }
}
