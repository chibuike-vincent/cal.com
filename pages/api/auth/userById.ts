
import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

export default async(req: NextApiRequest, res:NextApiResponse) =>{

    if(req.method !== "GET"){
        return res.json("Invalid request method provided")
    }

    const user:any = req.query
    console.log(user.id, "dataddddd")

    const response = await prisma.user.findUnique({
        where: {
            id: user.id
        }
      })

    return res.json(response)
}






