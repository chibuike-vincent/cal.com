import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

export default async(req: NextApiRequest, res: NextApiResponse) =>{
    if(req.method !== "PUT"){
        return res.json("Invalid request method provided")
    }

    const data = JSON.parse(req.body)
    console.log(data, "data")

    const response = await prisma.bookingRec.update({
        where: {id: data.id},
        data: { status: 'cancelled' }
    })

    return res.json(response)
}