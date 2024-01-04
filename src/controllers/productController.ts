import { product } from './../../schema.ts';
import express from 'express'
import db from '../../db.ts'
import { eq } from 'drizzle-orm';

export const getAllProcucts = async(req:express.Request, res:express.Response)=> {
 try {
    const products = await db.select().from(product).execute();

    return res.status(200).json(products);
 } catch (e) {
    console.log(e);
    return res.status(500).json('Server Error');
 }
}

export const getProductById = async(req:express.Request, res:express.Response)=> {
  const { id } = req.params;
  
  try {
    const userById = await db
      .select()
      .from(product)
      .where(eq(product.id, Number(id)))
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

}

export const createProduct = async(req:express.Request, res:express.Response)=> {
    const{productName,price,quantity}:{productName:string, price:number, quantity:number} =req.body

    if(!productName || typeof productName !== "string" || price || !quantity){
        return res.status(400).json('Please provide all fields')
    }
    try {
        // CHECK IF PRODUCT ALREADY EXISTS AND IF IT DOES INCREASE THE QUANTITY
        // const checkProduct = await db.select().from(product).where(eq(product.productName, productName)).execute()
        // if(checkProduct){ 
        //   await db.update(product).set({quantity: checkProduct.quantity + 1}).where(eq(product.productName, productName)).execute()
        //   return res.status(200).json('Product quantity increased')
        // }
        const newProduct = await db.insert(product).values({productName,price,quantity}).execute()

        return res.status(200).json('User succesfully created')
        
    } catch (error) {
        res.status(500).json('Server Error')
    }

}

export const updateProductDetails = async(req:express.Request, res:express.Response )=>{
  const {id} = req.params
    
    if(!id){
        return res.status(409).json('No id was found')
    }
  
    try {    
      const checkValidId = await db.select().from(product).where(eq(product.id, Number(id))).execute()
      if(!checkValidId){
        return res.status(400).json('Invalid Id')
      }
      const updatedProduct = req.body
      await db
          .update(product)
          .set(updatedProduct)
          .where(eq(product.id, Number(id)))
          .returning({ id: product.id,  productName: product.productName})
      
      return res.status(200).json({ success: true, message: "Update Successfully" });
      
    } catch (error) {
      res.status(500).json({ success: false, message: "Unable to update user" });
    }

}

export const deleteProduct = async(req:express.Request, res:express.Response) =>{
  const { id } = req.params;
  try {
    const isValidId = await db.select().from(product).where(eq(product.id, Number(id))).execute()
    if(!isValidId){
      return res.status(400).json('Invalid Id')
    }
    await db.delete(product).where(eq(product.id, Number(id)));
    return res
      .status(200)
      .json({ success: true, message: "Delete Successfully" });
  } catch (error) {
    return res.status(500).json({ success: true, message: "Cannot Delete" });
  }
}

