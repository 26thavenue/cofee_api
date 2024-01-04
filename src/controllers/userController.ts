import {  eq, like } from 'drizzle-orm';
import {staff} from '../../schema.ts'
import {Request, Response} from 'express'
import db from '../../db.ts'
import { Staff } from '../types/index.ts';

export const getAllStaffs = async(req:Request,res:Response) => {
 try {
    const users = await db.select().from(staff).execute();

    return res.status(200).json(users);
 } catch (e) {
    console.log(e);
    return res.status(500).json('Server Error');
 }
}

export const getStaffById = async(req:Request, res:Response) =>{
  const { id } = req.params;
  
  try {
    const userById = await db
      .select()
      .from(staff)
      .where(eq(staff.id, Number(id)))
      .execute();
    
    if(!id){
            res.status(400).json('Invalid Id')
    }

    return res.status(200).json({ success: true, data: userById });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, data: null, message: "Unable to get users" });
  }
};

export const updateStaffById = async (req:Request, res:Response) => {
    const {id} = req.params
    
    if(!id){
        return res.status(409).json('No id was found')
    }
    try {
      const checkValidId = await db.select().from(staff).where(eq(staff.id, Number(id))).execute()
      if(!checkValidId){
        return res.status(400).json('Invalid Id')
      }

      const updatedUser:Staff = req.body

      await db
          .update(staff)
          .set(updatedUser)
          .where(eq(staff.id, Number(id)))
          .returning({ id: staff.id,  email: staff.email})
      
      return res.status(200).json({ success: true, message: "Update Successfully" });
      
    } catch (error) {
      res.status(500).json({ success: false, message: "Unable to update user" });
    }
    
}

export const deleteStaff = async(req:Request, res:Response) => {
  const { id } = req.params;
  try {
    const isValidId = await db.select().from(staff).where(eq(staff.id, Number(id))).execute()
    if(!isValidId){
      return res.status(400).json('Invalid Id')
    }
    await db.delete(staff).where(eq(staff.id, Number(id)));
    return res
      .status(200)
      .json({ success: true, message: "Delete Successfully" });
  } catch (error) {
    return res.status(500).json({ success: true, message: "Cannot Delete" });
  }
}


