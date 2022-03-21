
import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

export default async(req: NextApiRequest, res: NextApiResponse) =>{

    if(req.method !== "GET"){
        return res.json("Invalid request method provided")
    }

    const event:any = req.query
    console.log(event, "data")

    const response = await prisma.eventsType.findFirst({
        where: {
            id: Number(event.id)
        }
      })

    return res.json(response)
}






