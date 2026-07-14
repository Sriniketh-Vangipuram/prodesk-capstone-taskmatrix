import bcrypt from "bcryptjs";
import { authRepository, AuthRepository } from "./auth.repository";

import { RegisterDto,LoginDto } from "./auth.schema";

import { ApiError } from "../../shared/utils/ApiError";

import { generateToken } from "../../shared/utils/jwt";

class AuthService{
    async register(data:RegisterDto){
        const existingUser=await authRepository.findByEmail(data.email);

        if(existingUser){
            throw new ApiError(409,"Email already exists");
        }

        const hashedPassword=await bcrypt.hash(data.password,10);

        const user=await authRepository.create({
            name:data.name,
            email:data.email,
            password:hashedPassword,
        });

        const token=generateToken({
            userId:user.id,
        });

        return {
            user:{
                id:user.id,
                name:user.name,
                email:user.email,
            },

            token,
        };
    }

    async login(data:LoginDto){
        const user=await authRepository.findByEmail(data.email);

        if(!user){
            throw new ApiError(401,"Invalid email or password");
        }

        const isPasswordValid=await bcrypt.compare(data.password,user.password);

        if(!isPasswordValid){
            throw new ApiError(401,"Invalid password");
        }

        const token=generateToken({
            userId:user.id,
        });

        return {
            user:{
                id:user.id,
                name:user.name,
                email:user.email,
            },

            token,
        };
    }
}

export const authService=new AuthService();