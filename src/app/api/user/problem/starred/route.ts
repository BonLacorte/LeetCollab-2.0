import prisma from '@/lib/prisma';
import { NextResponse, NextRequest } from 'next/server';

export const POST = async (req: NextRequest ) => {
    const { userId, problemId } = await req.json();

    if (!userId || !problemId) {
        return NextResponse.json({ message: 'Missing userId or problemId' }, { status: 400 });
    }

    try {
        const existingStar = await prisma.starredProblems.findFirst({
            where: {
                userId: userId,
                problemId: problemId,
            },
        });

        if (existingStar) {
            // Unstar: Remove the existing star
            await prisma.starredProblems.delete({
                where: {
                    starredProblemId: existingStar.starredProblemId,
                },
            });
            return NextResponse.json({ message: "Problem unstarred successfully" }, { status: 200 });
        } else {
            // Star: Create a new star
            await prisma.starredProblems.create({
                data: {
                    userId: userId,
                    problemId: problemId,
                },
            });
            return NextResponse.json({ message: "Problem starred successfully" }, { status: 200 });
        }
    } catch (error) {
        console.error("Error starring problem:", error);
        return NextResponse.json({ error: "Failed to star problem" }, { status: 500 });
    }
}