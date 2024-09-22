import express from 'express';
import { createProject, getUserProjects, deleteProject } from '../controllers/projectController.js';

const router = express.Router();

router.post('/', createProject);
router.get('/', getUserProjects); // Get all projects for a user
router.delete('/', deleteProject); // Delete a specific project

export default router;
