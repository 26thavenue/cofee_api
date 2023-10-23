import {Router} from 'express'
import isAdmin from '../middlewares/isAdmin'

import { getProduct,getProducts, createProduct,deleteProduct,updateProduct } from "../controller/productController";

const router = Router();

router.get('/',getProducts)
router.get('/:id',getProduct)
router.post('/',createProduct)
router.put('/:id',updateProduct)
router.delete('/:id',isAdmin,deleteProduct)

export default router;