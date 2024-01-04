import {  eq, like } from 'drizzle-orm';
import {staff} from '../../schema.ts'
import {Request, Response} from 'express'
import db from '../../db.ts'

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


// export const getStaffByEmail =async (req:Request, res:Response) => {
//     const{email}= req.query 
    
//     if(!email){
//         return res.status(409).json('No email was found')
//     }

//     const user = await db.query.staff.findMany({
//       where: eq(staff.email, email.toString())
//     })
    

//     if(!user){
//       return res.status(400).json('User does not exist')
//     }
//     return res.status(200).json(user)
// }

export const updateStaffById = async (req:Request, res:Response) => {
    const {id} = req.params
    if(!id){
        return res.status(409).json('No id was found')
    }

    // await db
    //     .update(user)
    //     .set(updatedUser)
    //     .where(eq(user.id, id))
    //     .returning({ id: user.id,  email: user.email})
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


