import prisma from '@/lib/prisma';
import { NextResponse, NextRequest } from 'next/server';

export const POST = async (req: NextRequest) => {
    if (req.method !== 'POST') {
        return NextResponse.json({ message: 'Method not allowed' }, { status: 405 });
    }

    const { userId, problemId } = await req.json();

    if (!userId || !problemId) {
        return NextResponse.json({ message: 'Missing userId or problemId' }, { status: 400 });
    }

    try {
        console.log("userId 1: ", userId);
        // console.log("problemId 1: ", problemId.problemId);
        // Check if there's an existing record
        const existingRecord = await prisma.solvedProblems.findFirst({
            where: {
                userId: userId,
                problemId: problemId,
            },
        });

        if (existingRecord) {
            return NextResponse.json({ message: 'Problem already marked as solved' }, { status: 200 });
        }

        // Create a new record
        await prisma.solvedProblems.create({
        data: {
            userId,
            problemId: problemId.problemId,
        },
        });

        return NextResponse.json({ message: 'Problem marked as solved' }, { status: 201 });
    } catch (error) {
        console.error('Error updating solved problem:', error);
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
}