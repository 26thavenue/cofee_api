import express from 'express'
import {order} from '../../schema.ts'
import db from'../../db.ts'
import { eq } from 'drizzle-orm'
import {Order} from '../types/index.ts'

export const getAllOrders = async(req:express.Request, res:express.Response)=> {
    try {
        const orders = await db.select().from(order)

        return res.sendStatus(200).json(orders)
    } catch (error) {
        console.log(error);
        return res.sendStatus(500).json('Server Error');
    }

}

export const getOrderById = async(req:express.Request, res:express.Response)=> {
    const {id} = req.params
     try {
        const oneOrder = await db.select()
                                 .from(order)
                                 .where(eq(order.id, Number(id)))
        
        if(!id){
            res.sendStatus(400).json('Invalid Id')
        }

        return res.sendStatus(200).json(oneOrder)
    } catch (error) {
        console.log(error);
        return res.sendStatus(500).json('Server Error');
    }

}

export const createNewOrder = async(req:express.Request, res:express.Response)=> {
    const {customer_name,staff_id}: {customer_name: string, staff_id: number} = req.body
    // VALIDATION CHECK FOR ALL THE TYPE PARAMS 

    try {
        const newOrder:Order = await db.insert(order).values({
                                                        customer_name:customer_name,
                                                        name: `${customer_name} + ${staff_id}`,
                                                        ordered_at: new Date().getTime,
                                                        staff_id: staff_id,
                                                        status:'pending'


                                                    })

       return res.json(newOrder)                                              

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