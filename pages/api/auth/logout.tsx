import { NextApiRequest, NextApiResponse, } from "next";
import { PrismaClient } from "@prisma/client";;
import cookie from "cookie"

export default async (req: NextApiRequest, res: NextApiResponse) => {

    res.setHeader(
        "Set-Cookie",
        cookie.serialize("token", "", {
            httpOnly: true,
            // secure: process.env.NODE_ENV !== "development",
            expires: new Date(0),
            sameSite: "strict",
            path: "/"
        })
    )

    return res.send({
        responseCode: "00",
        status: "success",
        message: "Log out successful",
    });
 


}