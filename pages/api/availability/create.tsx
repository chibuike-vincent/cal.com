import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

export default async(req: NextApiRequest, res: NextApiResponse) =>{
    if(req.method !== "POST"){
        return res.json("Invalid request method provided")
    }

    const data = JSON.parse(req.body)
    console.log(data, "data")

    const existing = await prisma.availabilities.findFirst({where: {
        owner: data.owner,
        day: data.day
    }})

    if(existing){
        return res.json({
            responseCode: "09",
            status: "duplicate",
            message: "Availability for selected day already created please update."
        })
    }

    const response = await prisma.availabilities.create({data: data})

    return res.json(response)
}