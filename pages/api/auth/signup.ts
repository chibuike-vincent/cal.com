import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import * as bcrypt from "bcryptjs";
import * as jwt from "jsonwebtoken";

const prisma = new PrismaClient()

export default async(req: NextApiRequest, res: NextApiResponse) =>{
    if(req.method !== "POST"){
        return res.json("Invalid request method provided")
    }

   try {
    const jsonData = JSON.parse(req.body)

    const existing = await prisma.user.findMany({ where: { OR: [{email: jsonData.email }, {userName: jsonData.userName }] }})

    if (existing.length) {
        return res.status(404).json({
            responseCode: "08",
            status: "failed",
            message: `User with same email or user name already exist`,
        });
    }

    const pattern = /^(?=.*[0-9])(?=.*[!@#$%^&*_])(?=.*[A-Z])[a-zA-Z0-9!@#$%^&*_]{8,100}$/;

    if (!jsonData.password.match(pattern)) {
        return res.status(400).json({
            responseCode: "02",
            status: "failed",
            message: "Password must be more than 8 characters and contain atleast one capital letter and one special character.",
        });
    }
    

    const {
        userName,
        email,
        password
    } = jsonData;

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const data = {
              email: email,
              userName: userName,
              password: hash
            }
  

    const user = await prisma.user.create({data: data})

    return res.json({
        responseCode: "00",
        status: "success",
        message: "User Successfully Created",
        data: {
            id: user.id,
            userName,
            email,
            hash
        }
    });
   } catch (error) {
       console.log(error)
    return res.status(500).json({
        responseCode: "99",
        status: "failed",
        message: "An error Occurred Please Try again",
    });
   }
}