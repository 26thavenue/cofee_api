import express from 'express'

export const getAllProcucts = async(req:express.Request, res:express.Response)=> {

}

export const getProductById = async(req:express.Request, res:express.Response)=> {

}

export const createProduct = async(req:express.Request, res:express.Response)=> {
    const{productName,price,quantity} =req.body

}

export const updateProductDetails = async(req:express.Request, res:express.Response )=>{

}

export const deleteProduct = async(req:express.Request, res:express.Response) =>{}

