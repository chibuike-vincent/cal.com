import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import {isAuth} from "../isAuth"

const prisma = new PrismaClient()

export default async (req: NextApiRequest, res: NextApiResponse, next:any) => {
    // isAuth(req, res, next)
    
    if(req.method !== "GET"){
        return res.json("Invalid request method provided")
    }

    const owner:any = req.query
    console.log(owner, "data")

    const response:any = await prisma.availabilities.findMany({where: {
        owner: owner.id
    }})

    return res.json(response)
}