import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDocument } from '../auth/schemas/user.schema';

@Injectable()
export class AdminService {
    constructor(@InjectModel('users') private userModel: Model<UserDocument>) { }
    
    async getAllUserNames() {
        const result = (await this.userModel.find()).map(item => ({name:item.name, _id:item._id, picture: item.picture}))
        return result
    }

    async getUserData(userId:string) {
        const result = this.userModel.findById(userId)
        return (await result).food
    }

    async getAdminStats(allEntries:any) {
        let last_week_dates = []; 
        //let week_before_dates = []
        for (let i=0; i<7; i++) {
            let d = new Date();
            d.setDate(d.getDate() - i);
            let year = d.toLocaleString("default", { year: "numeric" });
            let month = d.toLocaleString("default", { month: "2-digit" });
            let day = d.toLocaleString("default", { day: "2-digit" });
            let newD = year + "-" + month + "-" + day;
            last_week_dates.push( newD )
        }
        // for (let i=0; i<7; i++) {
        //     let d = new Date(last_week_dates[-1])
        //     d.setDate(d.getDate() - i);
        //     let year = d.toLocaleString("default", { year: "numeric" });
        //     let month = d.toLocaleString("default", { month: "2-digit" });
        //     let day = d.toLocaleString("default", { day: "2-digit" });
        //     let newD = year + "-" + month + "-" + day;
        //     week_before_dates.push( newD )
        // }
        let arr = []
        last_week_dates.map(date => {
            allEntries.map(item => item.date===date && arr.push(item))
        })

        //calories added per user
        let users = (await this.getAllUserNames()).length
        return {
            entries_last_7_days: arr.length,
            average_calories_added_per_user: arr.reduce(function (acc, obj) { return acc + obj.calorie; }, 0)/users
        }
        // return {
        //     last_week_dates, week_before_dates
        // }
    }
}
