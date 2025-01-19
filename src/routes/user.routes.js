import { Router } from 'express';
import { registerUser } from './path/to/your/controller'; // Adjust the import path as needed

const router = Router();

router.route('/register').post(registerUser);
// Uncomment the following line if you need the login route
// router.route('/login').post(loginUser);

export default router;
