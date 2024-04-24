import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export const GET = async (req, {params}) => {
    try {
        const {id} = params;
        
        const data = await prisma.todo.findUnique({
            where: {
                id: +id
            }
        })
        return NextResponse.json(data, {status: 200})
    } catch(err) {
        console.log(err)
        return NextResponse.json({message: "Internal Server Error"}, {status: 500})
    }
}

export const DELETE = async (req, {params}) => {
    try {
        const {id} = params;

        await prisma.todo.delete({
            where: {
                id: +id
            }
        })

        return NextResponse.json({message: "Todo deleted"})
    } catch(err) {
        console.log(err)
        return NextResponse.json({message: "Internal Server Error"}, {status: 500})
    }
}