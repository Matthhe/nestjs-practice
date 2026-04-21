import { Body, Controller, Delete, Get, Param, Patch, Post, Query, ParseIntPipe, ValidationPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto'; //! Represents the user as well

@Controller('users') // /users - route
export class UsersController {

    constructor(private readonly usersService: UsersService){}

    /*
     GET /users
     GET /users/:id
     POST /users
     PATCH /users/:id - bc i want to change only one thing in my user
     DELETE /users/:id
    */
     //! Routes work like a waterfall. 
     //! route like 'interns'(expample) must be before a dynamic route that could accept and ID as a param

    @Get() //* GET /users or /users?role=value where ?role=value => query parameter
    findAll(@Query('role') role?: 'INTERN' | 'ENGINEER' | 'ADMIN'){
        return this.usersService.findAll(role)
    }

    //! In this method used ParseIntPipe, which give us apportunity to not use '+' before 'id'
    //! Also ParseIntPipe transforms string number to numeric data and also validates the request data
    @Get(':id') //* GET /users/:id 
    findOne(@Param('id', ParseIntPipe) id: number){
        return this.usersService.findOne(id)
    }

    @Post() //* POST /users and there @Body have user information
    create(@Body(ValidationPipe) CreateUserDto: CreateUserDto ){ // to POST we need to read Body of the request
        return this.usersService.create(CreateUserDto) // bc we need tosend that data 
                              // 'user' here, it is what type the body is
    }
    
    @Patch(':id') //* PACTH /users/:id 
    update(@Param('id', ParseIntPipe) id: number, @Body(ValidationPipe) UpdateUserDto: UpdateUserDto){
        return this.usersService.update(id, UpdateUserDto)
    }

    @Delete(':id') //* DELETE /users/:id 
    delete(@Param('id', ParseIntPipe) id: number){
        return this.usersService.delete(id)
    }
}


