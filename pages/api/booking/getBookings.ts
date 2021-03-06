import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

export default async(req: NextApiRequest, res: NextApiResponse) =>{
    if(req.method !== "GET"){
        return res.json("Invalid request method provided")
    }

    const ownerId:any = req.query

    const response:any = await prisma.bookingRec.findMany({where: {
        // @ts-ignore
        owner: Number(ownerId.id)
    }})

    return res.json(response)
}