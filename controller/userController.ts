import {Request, Response} from 'express'

export const getAllUsers = async(res:Response, req:Request) => {

}
export const deleteUser = async(res:Response, req:Request) => {
    const {id} = req.params
}
export const updateUser = async(res:Response, req:Request) => {}
export const getUser = async(res:Response, req:Request) => {}
