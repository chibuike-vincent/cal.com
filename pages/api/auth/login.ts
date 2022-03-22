import { NextApiRequest, NextApiResponse, } from "next";
import { PrismaClient } from "@prisma/client";
import * as bcrypt from "bcryptjs";
import * as jwt from "jsonwebtoken";
import cookie from "cookie"

const prisma = new PrismaClient()

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== "POST") {
        return res.json("Invalid request method provided")
    }

  try {
    const jsonData = JSON.parse(req.body)
    console.log(jsonData, "data")

    const { email, password } = jsonData;

    const pattern = /^(?=.*[0-9])(?=.*[!@#$%^&*_])(?=.*[A-Z])[a-zA-Z0-9!@#$%^&*_]{8,100}$/;

    if (!password.match(pattern)) {
        return res.status(400).json({
            responseCode: "02",
            status: "failed",
            message: "Password must be more than 8 characters and contain atleast one capital letter and one special character.",
        });
    }

    const existing = await prisma.user.findMany({ where: { email: email }})
    

    if (!existing.length) {
        return res.status(404).json({
            responseCode: "08",
            status: "failed",
            message: `User with email ${email} does not exists`,
        });
    }

    const validPassword = await bcrypt.compare(password, existing[0].password);

    if (validPassword === false) {
        return res.status(400).json({
            responseCode: "02",
            status: 'failed',
            message: `Password does not match`,
            data: {
                password: ['Passwords does not match'],
            },
        });
    }



    const token = await jwt.sign(
        {
            id: Number(existing[0].id),
            email: existing[0].email,
            userName: existing[0].userName
        },
        "simba+cal.com",
        {
            expiresIn: '1hr',
        }
    );

    res.setHeader(
        "Set-Cookie",
        cookie.serialize("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV !== "development",
            maxAge: 60 * 60,
            sameSite: "strict",
            path: "/"
        })
    )

    return res.send({
        responseCode: "00",
        status: "success",
        message: "User Successfully Created",
        data: {
            id: existing[0].id,
            email: existing[0].email,
            userName: existing[0].userName,
            token
        }
    });
  } catch (error) {
      console.log(error, "login")
    return res.status(500).json({
        responseCode: "99",
        status: "failed",
        message: "An error Occurred Please Try again",
    });
  }


}