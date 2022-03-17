
import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

export default async(req: NextApiRequest, res: NextApiResponse) =>{
    if(req.method !== "POST"){
        return res.json("Invalid request method provided")
    }

    const data = JSON.parse(req.body)
    console.log(data, "data")

   
    const response = await prisma.eventsType.createMany({
        data: data,
        skipDuplicates: true, 
      })

    return res.json(response)
}






