import prisma from '@/lib/prisma';
import { NextResponse, NextRequest } from 'next/server';

export const POST = async (req: NextRequest) => {

    // if (req.method !== 'POST') {
    //     return NextResponse.json({ message: 'Method not allowed' }, { status: 405 });
    // }

    const { userId, problemId } = await req.json();

    if (!userId || !problemId) {
        return NextResponse.json({ message: 'Missing userId or problemId' }, { status: 400 });
    }

    console.log("hello: ");
    console.log("userId 1: ", userId);
    console.log("problemId: ", problemId);
    // console.log("problemId 1: ", problemId.problemId);

    // try {
    //     return NextResponse.json({ message: "hello" }, { status: 200 });
    // } catch (error) {
    //     console.error("Error liking problem:", error);
    //     return NextResponse.json({ error: "Failed to like problem" }, { status: 500 });
    // }

    try {
        const existingLike = await prisma.likedProblems.findFirst({
            where: {
                userId: userId,
                problemId: problemId,
            },
        });

        console.log("existingLike: ", existingLike);

        if (existingLike) {
            // Unlike: Remove the existing like
            await prisma.likedProblems.delete({
                where: {
                    likedProblemId: existingLike.likedProblemId,
                },
            });
            return NextResponse.json({ message: "Problem unliked successfully" }, { status: 200 });
        } else {
            // Like: Create a new like
            await prisma.likedProblems.create({
                data: {
                    userId: userId,
                    problemId: problemId,
                },
            });
            return NextResponse.json({ message: "Problem liked successfully" }, { status: 200 });
        }
        // return NextResponse.json({ message: "hello" }, { status: 200 });
    } catch (error) {
        console.error("Error liking/unliking problem:", error);
        return NextResponse.json({ error: "Failed to like/unlike problem" }, { status: 500 });
    }
}
