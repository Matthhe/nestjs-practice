import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { UsersService } from './users.service';
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

     // Routes work like a waterfall. 
     // route like 'interns'(expample) must be before a dynamic route that could accept and ID as a param

    @Get() // GET /users or /users?role=value where ?role=value => query parameter
    findAll(@Query('role') role?: 'INTERN' | 'ENGINEER' | 'ADMIN'){
        return this.usersService.findAll(role)
    }

    @Get(':id') // GET /users/:id 
    findOne(@Param('id') id: string){
        return this.usersService.findOne(+id)
    }

    @Post() // POST /users and there @Body have user information
    create(@Body() user: {name: string, email: string, role: 'INTERN' | 'ENGINEER' | 'ADMIN' }){ // to POST we need to read Body of the request
        return this.usersService.create(user) // bc we need tosend that data 
                              // 'user' here, it is what type the body is
    }
    
    @Patch(':id') // PACTH /users/:id 
    update(@Param('id') id: string, @Body() userUpdate: {name?: string, email?: string, role?: 'INTERN' | 'ENGINEER' | 'ADMIN' }){
        return this.usersService.update(+id, userUpdate)
    }

    @Delete(':id') // DELETE /users/:id 
    delete(@Param('id') id: string){
        return this.usersService.delete(+id)
    }
}


