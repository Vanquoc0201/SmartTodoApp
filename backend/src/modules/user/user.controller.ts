import { Body, Controller, Delete, Get, Post, Put, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { PaginationDto } from './dto/pagination-user.dto';
import { AddUserDto } from './dto/adduser-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';


@Controller('User')
export class UserController {
    constructor (private readonly userService : UserService){}
    @Get('GetAllUser')
    @ApiBearerAuth('AccessToken')
    async getAllUser(){
        return await this.userService.getAllUser();
    }



    @Get('GetAllUserPagination')
    @ApiBearerAuth('AccessToken')
    @ApiQuery({
        name: 'page',
        required: false,
        description: 'If not transmitted, default is 1',
        example: '1',
      })
      @ApiQuery({
        name: 'pageSize',
        required: false,
        description: 'If not transmitted, default is 3',
        example: '3',
      })
      @ApiQuery({
        name: 'search',
        required: false,
        description: 'Search keywords',
        example: 'quoc',
      })
    async getAllUserPagination(
        @Query('page') page: string ,
        @Query('pageSize') pageSize: string,
        @Query('search') search: string
      ) {
        const paginationDto: PaginationDto = {
          page,
          pageSize,
          search,
        };
        return this.userService.getAllUserPagination(paginationDto);
    }



    @Get('SearchUser')
    @ApiBearerAuth('AccessToken')
    @ApiQuery({
        name: 'email',
        required: true,
        description: 'Account to search',
        example: 'quoc@gmail.com',
    })
    async searchUser (
        @Query('email') email:string
    ){
        return this.userService.searchUser(email)
    }



    @Post('AddUser')
    @ApiBearerAuth('AccessToken')
    async addUser(
        @Body()
        body : AddUserDto
    ){
        return this.userService.addUser(body)
    }



    @Delete('DeleteUser')
    @ApiBearerAuth('AccessToken')
    @ApiQuery({
        name: 'email',
        required: true,
        description: 'Account to Delete',
        example: 'nguyenvana123@gmail.com',
    })
    async deleteUser(
        @Query('email') email:string
    ){
        return this.userService.deleteUser(email)
    }



    @Put('UpdateUser')
    @ApiBearerAuth('AccessToken')
    async updateUser(
        @Body() body: UpdateUserDto
    ){
        return this.userService.updateUser(body)
    }


    @Get('GetInfoUser')
    @ApiBearerAuth('AccessToken')
    @ApiQuery({
        name: 'email',
        required: true,
        description: 'Account to Get Info',
        example: 'nguyenvanb@gmail.com'
    })
    async getUserInfo(
        @Query('email') email: string
    ){
        return this.userService.getUserInfo(email)
    }

}