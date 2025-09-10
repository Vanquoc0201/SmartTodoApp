import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { PaginationDto } from './dto/pagination-user.dto';
import { AddUserDto } from './dto/adduser-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
    constructor(private readonly prismaService : PrismaService) {}
    async getAllUser(){
        const users = await this.prismaService.users.findMany();
        return {
            status: 'success',
            message: 'Get list of users successfully',
            data: users,
        };
    }
    async getAllUserPagination(paginationDto: PaginationDto) {
        let { page, pageSize , search } = paginationDto;
        page = +page > 0 ? +page : 1;
        pageSize = +pageSize > 0 ? +pageSize : 3;
        search = search || ``;
        const skip = (page - 1) * pageSize;
        const where = { email: { contains: search } };
        const users = await this.prismaService.users.findMany({
            skip: skip,
            take: pageSize,
            orderBy: { created_at: 'desc' },
            where: where,
        });
        if(!users.length){
            throw new BadRequestException('User not found');
        }
        const totalItem = await this.prismaService.users.count({
            where: where,
          });
        const totalPage = Math.ceil(totalItem / pageSize);
        return {
            page: page,
            pageSize: pageSize,
            totalItem: totalItem,
            totalPage: totalPage,
            items: users || [],
        };
    }
    async searchUser(email: string) {
        const where = { email: { contains: email } };
        const user = await this.prismaService.users.findMany({
            where: where
        });
        if (!user.length) {
            throw new BadRequestException('User Not found');
        }
        return {
            status: 'success',
            message: `Get list of users with account ${email} successfully`,
            data: user,
        };
    }
    async addUser(body : AddUserDto){
        const { email, password, name } = body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const existingUser = await this.prismaService.users.findUnique({
            where: { email },
        });
        if (existingUser) {
            throw new BadRequestException('Account already exists');
        }
        const newUser = await this.prismaService.users.create({
            data: {
                email,
                password_hash : hashedPassword,
                name
            },
        })
        const { password_hash: _ , ...userWithoutPassword } = newUser;
        return {
            message: 'User added successfully',
            ...userWithoutPassword,
        }
    }
    async deleteUser(email: string){
        const user = await this.prismaService.users.findUnique({
            where: { email },
        });
        if (!user) {
            throw new BadRequestException('Account does not exist');
        }
        await this.prismaService.users.delete({
            where: { email },
        });
        return {
            message: 'User deleted successfully',
            ...user,
        };
    }
    async updateUser(body: UpdateUserDto) {
        const { name, email } = body;
        const existingUser = await this.prismaService.users.findUnique({
            where: { email },
        });
        if (!existingUser) {
            throw new BadRequestException('Tài khoản không tồn tại');
        }
        const dataToUpdate: any = {
            ...(name && { name }),
            ...(email && { email }),
            updated_at: new Date(),
        };
        const updatedUser = await this.prismaService.users.update({
            where: { email },
            data: dataToUpdate,
        });
        return {
            message: 'User update successful',
            ...updatedUser,
        };
    }

    async getUserInfo(email: string) {
        const user = await this.prismaService.users.findUnique({
            where: { email },
        });
        if (!user) {
            throw new BadRequestException('Account does not exist');
        }
        return {
            message: 'Get user information successfully',
            ...user,
        };
    }
}