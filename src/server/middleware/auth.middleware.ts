import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { User } from "../../shared/models/user.model.js";

interface AuthRequest extends Request{
    user?: User;
}

function authHandle(req:AuthRequest, res:Response,next:NextFunction){
    const cookie = req.cookies["jwt"];
    console.log("auth_cookie", cookie);
    const access_secret = process.env.ACCESS_TOKEN_SECRET as string;

    jwt.verify(
        cookie,
        access_secret,
        (err:any, result:any)=>{
            if(err){
                return res.sendStatus(403);
            }
            if(result){
                req.user = result.user;
            }
    })
    next();
}
export const authHandler = authHandle;