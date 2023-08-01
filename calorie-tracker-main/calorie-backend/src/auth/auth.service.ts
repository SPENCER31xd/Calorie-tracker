import { Injectable } from '@nestjs/common';
import { loginUserDto } from './dtos/loginUser.dto';
import { registerUserDto } from './dtos/registerUser.dto';
import {InjectModel} from '@nestjs/mongoose'
import { UserDocument } from './schemas/user.schema';
import { Model } from 'mongoose';

@Injectable()
export class AuthService {

    constructor(@InjectModel('users') private userModel:Model<UserDocument>){}

    async loginUser(loginData: loginUserDto) {
        const result = await this.userModel.findOne({ email: loginData.email })
        return result
     }
    
    registerUser(registerData: registerUserDto) {
        const result = new this.userModel(registerData)
        return result.save()
    }

    async getUserProfile(userId:string) {
        const result = await this.userModel.findById(userId)
        return result
    }

    async updateUserProfile(userId:string, userDetails:any) {
        const result = await this.userModel.findByIdAndUpdate(userId, userDetails, {upsert: true, new:true})
        return result
    }

    // async getUserInfo(userId:string) {
    //     const result = await this.userModel.findById(userId)
    //     return result
    // }

    // async addProductToWishlist(productDetails:any, userId:string) {
    //     const result = await this.userModel.findByIdAndUpdate(userId,{"$push": {'wishlist':productDetails}})
    //     return result
    // }

    // async removeProductFromWishlist(productId:string, userId:string) {
    //     const result = await this.userModel.findByIdAndUpdate(userId, { "$pull": { 'wishlist': { "_id": productId } } })
    //     return result
    // }

    // async addProductToCart(productDetails:any, userId:string) {
    //     const result = await this.userModel.findByIdAndUpdate(userId,{"$push": {'cart':productDetails}})
    //     return result
    // }

    // async removeProductFromCart(productId:string, userId:string) {
    //     const result = await this.userModel.findByIdAndUpdate(userId, { "$pull": { 'cart': { "_id": productId } } })
    //     return result
    // }

    // async updateProductQuantity(productId:string, userId:string, updateType:string) {
    //     const result = await this.userModel.updateOne({
    //     "postId" : userId,
    //     'cart': {
    //       '$elemMatch': {
    //         '_id': productId
    //       }
    //     }
    //   },
    //   {
    //     '$inc': {
    //       "cart.$[outer].quantity": updateType==='increment'?1:-1,
    //     }
    //   },
    //   {
    //     'arrayFilters': [
    //       { "outer._id": productId},

    //   ]
    //   })
    //     return result
    // }

    // async moveProductToCart(productData:any, userId:string) {
    //     const result = await this.userModel.findByIdAndUpdate(userId,{ "$pull": { 'wishlist': { "_id": productData._id } }, "$push":{"cart": productData} })
    //     return result
    // }
}
