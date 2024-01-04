import express from 'express'
import dotenv from 'dotenv'
import db from '../../db.ts'
import {  eq } from 'drizzle-orm';
import {hashPassword, comparePasswords } from '../utils/helper.ts' 
import {staff} from '../../schema.ts'
import jwt from 'jsonwebtoken'

dotenv.config()

const secret_key = process.env.JWT_SECRET as string

export const register = async(req:express.Request, res: express.Response):Promise<any> =>{
    const {name,email,password, isAdmin}:{name:string, email:string, password:string, isAdmin?:boolean} = req.body

    try {

        if(!name || !email || !password ){
        return res.status(400).json('Invalid field')
        }
        
        const result = await db.select().from(staff).where(eq(staff.email, email))

        if(result){
            return res.status(403).json('Email already in use')
        }
    
        const hashedPassword:string = await hashPassword(password) 

        const user = await db.insert(staff).values({name,email,password:hashedPassword, isAdmin}).execute()

        return res.status(200).json('User succesfully created')
        
    } catch (error) {
        // console.log(error)
        return res.status(500).json('Internal server error')
        
    }
    

    

    
}

export const login = async(req:express.Request, res:express.Response) => {


    try {

        const {email,password}:{ email:string, password:string} = req.body
        if(!email || !password){
            return res.sendStatus(400).json('Invalid params')
        }
        const user = await db.select().from(staff).where(eq(staff.email, email))
        if(!user){
            return res.status(403).json('Invalid credentials')
        }
        const isMatch = await comparePasswords(password, staff.password.toString())
        if(!isMatch){
            return res.status(403).json('Invalid credentials')
        }
         const payload = {
                email: staff.email,
                password: staff.password,
            };
        const token = jwt.sign(payload, secret_key, { expiresIn: '5d' });

         res.status(200).json({
            msg: "User is logged in",
            token: token
        });
    } catch (error) {
        
    }
   

}