import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export const GET = async (req, {params}) => {

    try {

        const data = await prisma.todo.findMany();

        return NextResponse.json(data, {status: 200})
    } catch(err) {
        console.log(err);
        return NextResponse.json({message: "Internal Server Error"}, {status: 500})
    }
}

export const POST = async (req, {params}) => {
    try {   

        // Parsing json dari client
        const data = await req.json();
        await prisma.todo.create({
            data
        })
        
        return NextResponse.json({message: "Todo created successful"})
    } catch(err) {
        console.log(err);
        return NextResponse.json({message: "Internal Server Error"}, {status: 500})
    }
}