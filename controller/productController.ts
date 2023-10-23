import { PrismaClient } from '@prisma/client'
import {Response, Request} from 'express'
const prisma = new PrismaClient()

export const createProduct = async(res:Response, req:Request) => {
     try {
    const { name, category, description, isAvailable, quantity, price } = req.body;

    const product = await prisma.product.create({
        data: {
            name,
            category,
            description,
            isAvailable,
            quantity,
            price,
        },
        });  
        res.json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create a product' });
  }
}
export const updateProduct = async(res:Response, req:Request) => {
    const productId = parseInt(req.params.id);

  try {
    const { name, category, description, isAvailable, quantity, price } = req.body;

    const updatedProduct = await prisma.product.update({
      where: { id: productId },
      data: {
        name,
        category,
        description,
        isAvailable,
        quantity,
        price,
      },
    });
    res.json(updatedProduct);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to update the product' });
    }
}
export const deleteProduct = async(res:Response, req:Request) => {
    const productId = parseInt(req.params.id);

  try {
    await prisma.product.delete({
      where: { id: productId },
    });

    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to delete the product' });
  }
}
export const getProducts = async(res:Response, req:Request) => { 
    try {
    const pageQuery= req.query.page
    if(typeof pageQuery !== 'number'){
        return res.json({error:'Invalid page number'})
    }
    const page = pageQuery  || 1;
    const itemsPerPage = 10;
    const skip = (page - 1) * itemsPerPage;

    const products = await prisma.product.findMany({
      skip,
      take: itemsPerPage,
    });

    const totalProducts = await prisma.product.count(); // Get the total number of products

    const totalPages = Math.ceil(totalProducts / itemsPerPage);

    res.json({
      products,
      currentPage: page,
      totalPages,
    })
    } catch (error) {
        return res.json({error:'Failed to fetch products'})
    }
    
}
export const getProduct = async(res:Response, req:Request) => {
    const productId = parseInt(req.params.id);

     try {
        const product = await prisma.product.findUnique({
        where: { id: productId },
        });
        if (!product) {
        res.status(404).json({ error: 'Product not found' });
        } 
        return res.json(product);
        
  } catch (error) {
    
    res.status(500).json({ error: 'Failed to retrieve the product' });
  }
}