import{Request,Response} from 'express'

export const register = (req:Request,res:Response) => {
    const {name,email,password} = req.body
    if(!name || !email || !password){
        return res.json({error:'All the fields are required'})
    } 
    return res.json({message: 'User succesfully created'})
}
export const login = () => {}