import prisma from "@/lib/db";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";


export async function POST(request: Request) {
    try {
       const body = await request.json();
       const { email, password, name ,role } = body;

       if(!email || !password || !name || !role) {
        return NextResponse.json({message: "Missing required fields"}, {status: 400});
       }

       const existing = await prisma.user.findUnique({
        where: { email },
       });
       if(existing) {
        return NextResponse.json({message: "User already exists"}, {status: 400});
       }
       const hashed = await bcrypt.hash(password, 10);
       const user = await prisma.user.create({
        data: {
            email,
            name,
            password: hashed,
            role,
        },
        select:{
            id: true,
            email: true,
            name: true,
            role: true,
        }
         });
         return NextResponse.json({user}, {status: 201});
    } catch (error) {

        
        return NextResponse.json({message: "Internal Server Error in signup"}, {status: 500});
    }
}