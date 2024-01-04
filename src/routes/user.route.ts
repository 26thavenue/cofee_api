import { Router } from "express";
import { getAllStaffs, getStaffByEmail,getStaffById } from "../controllers/userController.ts";
const router = Router()

router.get('/api/users', getAllStaffs);
router.get('/api/users/:id', getStaffById);


export default router;