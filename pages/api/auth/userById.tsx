
import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

export default async(req: any, res: any) =>{

    if(req.method !== "GET"){
        return res.json("Invalid request method provided")
    }

    const userId:any = req.query
    console.log(userId, "dataddddd")

    const response = await prisma.user.findUnique({
        where: {
            id: userId.id
        }
      })

    return res.json(response)
}






