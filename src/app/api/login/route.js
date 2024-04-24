import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { cookies } from "next/headers";

const SECRET_KEY = "rahasiabesar"

export const POST = async (req, {params}) => {

    try {

        const {email, password} = await req.json();
        
        const foundUser = await prisma.user.findFirst({
            where: {
                email
            }
        });

        if(!foundUser) 
            throw {name: "InvalidCredentials"}

        const comparePassword = bcrypt.compareSync(password, foundUser.password);

        if(comparePassword) {
            
            // Bikin Access Token
            const accessToken = jwt.sign({
                id: foundUser.id,
                email: foundUser.email
            }, SECRET_KEY)

            // SETUP COOKIES / LOCALSTORAGE / SESSIONSTORAGE

            cookies().set({
                name: "accessToken",
                value: accessToken,
                maxAge: 60 * 60 * 24 * 7
            })
            // Kirim Response
            return NextResponse.json({
                message: "Login Successfull",
                accessToken
            }, {status: 200})
        } else {
            throw {name: "InvalidCredentials"}
        }
        
    } catch(err) {
        
        if(err.name === "InvalidCredentials") {
            return NextResponse.json({message: "Wrong Email or Password"})
        } else {
            return NextResponse.json({message: "Internal Server Error"});
        }
    }
}