import express from 'express'
import {order, staff, product} from '../../schema.ts'
import db from'../../db.ts'
import { eq } from 'drizzle-orm'


export const getAllOrders = async(req:express.Request, res:express.Response)=> {
    try {
        const orders = await db.select().from(order)

        return res.status(200).json(orders)
    } catch (error) {
        console.log(error);
        return res.status(500).json('Server Error');
    }

}

export const getOrderById = async(req:express.Request, res:express.Response)=> {
    const {id} = req.params
     try {
        const oneOrder = await db.select()
                                 .from(order)
                                 .where(eq(order.id, Number(id)))
        
        if(!id){
            res.status(400).json('Invalid Id')
        }

        return res.status(200).json(oneOrder)
    } catch (error) {
        console.log(error);
        return res.status(500).json('Server Error');
    }

}

export const createNewOrder = async(req:express.Request, res:express.Response)=> {
    // STEP 1: CHECK IF THEIR LOGGED IN AND EXTRACT THEIR ID FROM THE TOKEN AND USE IT TO CREATE THE ORDER
    const {customer_name,staff_id}: {customer_name: string, staff_id: number} = req.body
    

    try {
        

                                                    

    } catch (error) {
        console.log(error);
        return res.sendStatus(500).json('Server Error');
    }

}

export const getAllStaffOrder = (req:express.Request, res:express.Response)=> {


}

export const updateOrderDetails = (req:express.Request, res:express.Response )=>{

}

export const deleteOrder = async(req:express.Request, res:express.Response) =>{
  const { id } = req.params;
  //VALIDATION CHECKING FOR THE ID PARAM
  try {
    await db.delete(order).where(eq(order.id, Number(id)));
    // WHAT IF THE ID FAILS
    return res
      .status(200)
      .json({ success: true, message: "Delete Successfully" });
  } catch (error) {
    return res.status(500).json({ success: true, message: "Cannot Delete" });
  }
}