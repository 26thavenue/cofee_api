import { Router } from "express";
import { getAllStaffs, getStaffByEmail } from "../controllers/userController.ts";
const router = Router()

router.get('/api/users', getAllStaffs);


export default router;