import { Injectable} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDocument } from '../auth/schemas/user.schema';
import { foodItemDto } from './dtos/foodItem.dto';

@Injectable()
export class FoodService {
    constructor(@InjectModel('users') private userModel: Model<UserDocument>) { }
    
    async addFoodItem(foodItem: foodItemDto, userId: string) {
        const result = await this.userModel.findByIdAndUpdate(userId, { "$push": { 'food': foodItem } })
        return result
    }

    async deleteFoodItem(foodId: string, userId: string) {
        const result = await this.userModel.findByIdAndUpdate(userId, { "$pull": { 'food': { "_id": foodId } } })
        return result
    }

    async updateFoodItem(foodItem: foodItemDto, userId: string) {
            const result = await this.userModel.updateOne({
        "_id" : userId,
        'food': {
          '$elemMatch': {
            '_id': foodItem._id
          }
        }
      },
      {
        '$set': {
          "food.$[outer]": foodItem,
        }
      },
      {
        'arrayFilters': [
          { "outer._id": foodItem._id},

      ]
      })
        return result
    }

    async getFoodStats(userId: string) {
        const result = await this.userModel.findById(userId)
        let total_price = 0
        let total_calories = 0
        let today_calories = 0
        let today_price = 0
        let monthly_cost = 0

        var date = new Date();
        var year = date.toLocaleString("default", { year: "numeric" });
        var month = date.toLocaleString("default", { month: "2-digit" });
        var day = date.toLocaleString("default", { day: "2-digit" });
        var todayDate = year + "-" + month + "-" + day;
        
        result.food.map(item => total_calories += item.calorie)
        result.food.map(item => total_price += item.price)
        result.food.map(item => {
            if (item.date === todayDate) {
                today_calories += item.calorie
            }
        })
        result.food.map(item => {
            if (item.date === todayDate) {
                today_price += item.price
            }
        })
        result.food.map(item => {
            if (item.date.split('-')[1] === month && item.date.split('-')[0] === year) {
                monthly_cost += item.price
            }
        })
        return {
            total_price,
            total_calories,
            today_calories,
            today_price,
            monthly_cost
        }
    }

    async getAllFoodEntries() {
        const result = this.userModel.find()
        let arr = []
            ; (await result).map(item => {
            item.food.map(x => arr.push(x))
            })
        return arr
    }

    async dailyProgressStats(userId:string) {
        const result = await this.userModel.findById(userId)
        const groups = result.food.reduce((groups, item) => {
            const group = (groups[item.date] || []);
            group.push(item);
            groups[item.date] = group;
            return groups;
        }, {});
        const sorted = Object.keys(groups).sort().reduce((accumulator, key) => {accumulator[key] = groups[key];
        return accumulator;
        }, {});

        let categories = Object.keys(sorted)
        let calories = []
        let price = []
        categories.map(item => {
            let cal = 0
            let pri = 0
            sorted[item].map(x => cal += x.calorie)
            sorted[item].map(x => pri += x.price)
            calories.push(cal)
            price.push(pri)
        })
        return {
            categories,
            series: [
                {
                    name: 'Calories',
                    data: calories
                },
            ]
        }
    }

     async monthlyProgressStats(userId:string) {
         const result = await this.userModel.findById(userId)
        const groups = result.food.reduce((groups, item) => {
            const group = (groups[item.date.split('-')[1]] || []);
            group.push(item);
            groups[item.date.split('-')[1]] = group;
            return groups;
        }, {});
        const sorted = Object.keys(groups).sort().reduce((accumulator, key) => {accumulator[key] = groups[key];
        return accumulator;
        }, {});

        let categories = Object.keys(sorted)
        let price = []
        categories.map(item => {
            let pri = 0
            sorted[item].map(x => pri += x.price)
            price.push(pri)
        })
        return {
            categories,
            series: [
                {
                    name: 'Price',
                    data: price
                }
            ]
        }
    }


}
