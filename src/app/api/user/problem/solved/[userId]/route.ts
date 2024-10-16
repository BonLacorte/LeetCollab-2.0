import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export const GET = async (req: Request, { params }: { params: { userId: string } }) => {
    const { userId } = params;
    console.log("userId:", userId)
    try {
        const solvedProblems = await prisma.solvedProblems.findMany({
            where: {
                userId: userId,
            },
            include: {
                problem: true,
            },
        });
        return NextResponse.json(solvedProblems);
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch solved problems", errorMessage: error }, { status: 500 });
    }
}