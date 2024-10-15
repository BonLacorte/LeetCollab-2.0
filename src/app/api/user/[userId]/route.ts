import prisma from '@/lib/prisma';
import { NextResponse, NextRequest } from 'next/server';

export const GET = async (req: NextRequest, { params }: { params: { userId: string } }) => {
    const { userId } = params;
    try {
        const user = await prisma.user.findUnique({
            where: { userId: userId }
        });
        return NextResponse.json(user);
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: "Failed to fetch user" }, { status: 500 });
    }
}