import express from 'express';
import { createTask, updateTaskStatus, deleteTask, getTasksByUserAndProject } from '../controllers/taskController.js';

const router = express.Router();

router.post('/', createTask); 
router.delete('/', deleteTask); 
router.get('/', getTasksByUserAndProject); 

export default router;
