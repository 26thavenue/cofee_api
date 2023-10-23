import {Router} from 'express'
import {register,login} from '../controller/authController'

const router = Router();

router.post('/register', register)
      .post('/login', login)


export default router