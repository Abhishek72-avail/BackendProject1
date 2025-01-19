import {Routes} from 'express';
import { register } from 'module';

const router = Routes();

router.router('/register') .post (registerUser) 
// router.router('/login') .post (loginUser) 
export default router;