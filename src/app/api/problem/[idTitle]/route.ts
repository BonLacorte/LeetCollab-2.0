import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

type ProblemParams = {
    idTitle: string;
}

// GET a problem by idTitle
export const GET = async (req: Request, { params }: { params: ProblemParams }) => {
    console.log(params.idTitle);
    try {
        console.log("Fetching problem: ", params.idTitle);
        const problem = await prisma.problem.findUnique({
            where: {
                idTitle: params.idTitle,
            }
        });
        return NextResponse.json( problem );
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: "Failed to fetch problem" }, { status: 500 });
    }
}