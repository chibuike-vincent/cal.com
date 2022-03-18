import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import {isAuth} from "../isAuth"

const prisma = new PrismaClient()

export default async (req: NextApiRequest, res: NextApiResponse, next:any) => {
    // isAuth(req, res, next)
    
    if(req.method !== "GET"){
        return res.json("Invalid request method provided")
    }

    const ownerId:any = req.query
    console.log(ownerId, "data")

    const response:any = await prisma.availabilities.findMany({where: {
        owner: ownerId.id
    }})

    return res.json(response)
}