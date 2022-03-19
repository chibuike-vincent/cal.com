
import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

export default async(req: any, res: any) =>{

    if(req.method !== "GET"){
        return res.json("Invalid request method provided")
    }

    const user:any = req.query
    console.log(user, "dataddddd")

    const response = await prisma.user.findUnique({
        where: {
            userName: user.username
        }
      })

    return res.json(response)
}






