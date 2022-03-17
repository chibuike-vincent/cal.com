import { NextApiRequest, NextApiResponse, } from "next";
import * as jwt from "jsonwebtoken"
 

export const isAuth = async(req: any, res: any, next:any) => {
  
    try {
        const token:any = req.headers["authorization"]  
     
        const validToken = await token.split(" ")[1]
        if(validToken){
            const user = await jwt.verify(validToken, "simba+cal.com")
            req.user = user
            next()
        }else{
            return res.send("login to continue")
        }
    } catch (error) {
        console.log(error)
        res.send("Session expired! Login to continue")
    }
}