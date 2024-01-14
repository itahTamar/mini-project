import express from 'express'
import { getUserRecipes} from './URCont';

const router = express.Router();

router.get('/get-user-recipes', getUserRecipes)

export default router;