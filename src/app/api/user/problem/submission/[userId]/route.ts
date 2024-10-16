import prisma from '@/lib/prisma'; // Adjust this import based on your Prisma setup
import { NextResponse, NextRequest } from 'next/server';

export const GET = async (req: NextRequest, { params }: { params: { userId: string } }) => {
    const { userId } = params;

    try {
        const submissions = await prisma.submission.findMany({
            where: { userId },
            include: {
                problem: true,
            },
        });
        return NextResponse.json(submissions);
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch submissions", errorMessage: error }, { status: 500 });
    }
}