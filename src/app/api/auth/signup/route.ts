/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import prisma from '@/lib/prisma';
import { z } from 'zod';

// Define a schema for input validation
const userSchema = z.object({
    name: z.string().min(1, { message: "Name is required" }),
    email: z.string().email({ message: "Invalid email address" }),
    username: z.string().min(1, { message: "Username is required" }),
    password: z.string().min(6, { message: "Password must be at least 6 characters long" }),
    confirmPassword: z.string().min(6, { message: "Password must be at least 6 characters long" }),
    image: z.string().optional(),
});

export async function POST(req: Request) {
    try {
        const body = await req.json();

        const { name, email, username, password, confirmPassword, image } = userSchema.parse(body);

        // console.log(name, email, username, password, confirmPassword)

        // check if email already exists
        const existingUser = await prisma.user.findUnique({
            where: { email }
        })

        if (existingUser) {
            return NextResponse.json({ error: "Email already exists" }, { status: 400 })
        }

        // check if username already exists
        const existingUsername = await prisma.user.findUnique({
            where: { username }
        })

        if (existingUsername) {
            return NextResponse.json({ error: "Username already exists" }, { status: 400 })
        }

        // check if password and confirmPassword match
        if (password !== confirmPassword) {
            return NextResponse.json({ error: "Passwords do not match" }, { status: 400 })
        }

        // create user
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await prisma.user.create({
            data: { name, email, username, password: hashedPassword, image }
        })
        
        const { password: newUserPassword, ...rest } = newUser;

        
        
        return NextResponse.json({ user: rest, message: "User created successfully" }, { status: 201 })
    } catch(error) {
        console.log(error);
        return NextResponse.json({ error: "Something went wrong" }, { status: 500 })
    }
}