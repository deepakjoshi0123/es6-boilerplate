import express from 'express'
import authControl from '../controllers/users.mjs'
import isVal from '../middleware/validate.mjs'
const router = express.Router();

router.post('/signup', isVal, authControl.signup);
router.post('/login', isVal, authControl.login);

router.post('/profile', isVal, authControl.getProfile);

export default router;
