import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop({required:true})
  name: string;

  @Prop({required:true})
  email: string

  @Prop({required:false})
  picture?: string

  @Prop()
  calorie_intake: number

  @Prop()
  monthly_budget: number

  @Prop({default: ['User']})
  roles: string[]

  @Prop({required:true })
  food: food[]
}

class food {
  @Prop({required: true})
  _id: string
  
  @Prop({required:true})
  name: string

  @Prop({required:true})
  date: string

  @Prop({required:true})
  calorie: number

  @Prop({required:true})
  price: number
}

export const UserSchema = SchemaFactory.createForClass(User);