import { Body, Controller, Delete, Get, Param, Patch, UseGuards } from '@nestjs/common';
import { FoodService } from '../food/food.service';
import { AdminService } from './admin.service';
import { Roles } from '../decorators/roles/roles.decorator';
import { RoleGuard } from '../guard/role/role.guard';

@Controller('admin')
@UseGuards(RoleGuard)
export class AdminController {
    constructor(private readonly adminService: AdminService, private readonly foodService: FoodService) { }
    
    @Roles('Admin')
    @Get()
    async getAllUserNames() {
        const result = await this.adminService.getAllUserNames()
        return result
    } 

    @Roles('Admin')
    @Get('stats')
    async getAdminStats() {
        const allEntries = await this.foodService.getAllFoodEntries()
        const result = await this.adminService.getAdminStats(allEntries)
        return result
    }
 
    @Roles('Admin')
    @Get(':id')
    async getUserData(@Param('id') userId:string) {
        const result = await this.adminService.getUserData(userId)
        return result
    }

    @Roles('Admin')
    @Patch(':id')
    async updateUserFoodDetails(@Body() foodDetails:any, @Param('id') userId:string) {
        const result = await this.foodService.updateFoodItem(foodDetails,userId)
        return result
    }

    @Roles('Admin')
    @Delete(':id/:fid')
    async deleteUserFoodItem(@Param('fid') foodId: string, @Param('id') userId: string) {
        const result = await this.foodService.deleteFoodItem(foodId,userId)
        return result
    }
}

