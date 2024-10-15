import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// GET all problems
export const GET = async (req: Request) => {
    try {
        const problems = await prisma.problem.findMany({
            orderBy: {
                order: 'asc',
            },
        });
        return NextResponse.json( problems );
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch problems" }, { status: 500 });
    }
}      