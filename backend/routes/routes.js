import { Router } from "express";
import {  addDepartment, getDepartments} from "../controller/conrollers.js";

const router = Router()

router.post('/department', addDepartment);
router.get('/department', getDepartments);


export default router;