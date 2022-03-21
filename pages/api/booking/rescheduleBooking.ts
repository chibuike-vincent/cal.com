import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

export default async(req: NextApiRequest, res: NextApiResponse) =>{
    if(req.method !== "POST"){
        return res.json("Invalid request method provided")
    }

    const data = JSON.parse(req.body)

    const response = await prisma.bookingRec.update({
        where: {id: data.id},
        data: { 
            startTime: data.startTime,
            endTime: data.endTime
         }
    })

    return res.json(response)
}