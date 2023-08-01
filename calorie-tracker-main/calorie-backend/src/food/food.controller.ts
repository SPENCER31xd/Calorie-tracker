import { Controller, Post } from '@nestjs/common';
import { Body, Delete, Get, Param, Put, Req } from '@nestjs/common/decorators';
import { Request } from 'express';
import { foodItemDto } from './dtos/foodItem.dto';
import { FoodService } from './food.service';

@Controller('food')
export class FoodController {
    constructor(private readonly foodService: FoodService) { }
    
    @Post()
    async addFoodItem(@Body() foodItem: foodItemDto, @Req() req: Request) {
        const userId = req['userId']
        const result = await this.foodService.addFoodItem(foodItem,userId )
        return result
    }

    @Delete(':_id')
    async deleteFoodItem(@Param('_id') foodId: string, @Req() req: Request) {
        const userId = req['userId']
        const result = await this.foodService.deleteFoodItem(foodId,userId )
        return result
    } 

    @Put()
    async updateFoodItem(@Body() foodItem:foodItemDto,@Req() req: Request) {
        const userId = req['userId']
        const result = await this.foodService.updateFoodItem(foodItem,userId )
        return result
    }

    @Get()
    async getFoodStats(@Req() req: Request) {
        const userId = req['userId']
        const result = await this.foodService.getFoodStats(userId )
        return result
    }

    @Get('daily')
    async dailyProgressStats(@Req() req: Request) {
        const userId = req['userId']
        const result = await this.foodService.dailyProgressStats(userId )
        return result
    }

    @Get('monthlyCost')
    async monthlyProgressStats(@Req() req: Request) {
        const userId = req['userId']
        const result = await this.foodService.monthlyProgressStats(userId )
        return result
    }

    @Get('allEntries')
    async getAllFoodEntries() {
        const result = await this.foodService.getAllFoodEntries( )
        return result
    }
}
