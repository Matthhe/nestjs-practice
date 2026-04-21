import { IsEmail, IsEmpty, IsEnum, IsNotEmpty, IsString } from "class-validator";

export class CreateUserDto{
    @IsString()
    @IsEmpty()
    name: string;

    @IsEmail()
    email: string;

    @IsEnum(["INTERN", "ENGINEER", "ADMIN"], {message: 'Valid role required'})
    role: "INTERN" | "ENGINEER" | "ADMIN";
}

//* It is usefull to create and update validations on the same type.
//* For example, the create variant may require all fields, while the update may take all
//* fields optional

//! ALso here is a new class named validator