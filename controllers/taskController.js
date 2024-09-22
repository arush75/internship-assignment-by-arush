

import Task from '../models/taskModel.js';
import Project from '../models/projectModel.js'; // Make sure to import the Project model

export const createTask = async (req, res) => {
    const { project_name, username, task_name, title, description } = req.body;

    try {
        // Check if the project exists
        const projectExists = await Project.findOne({ name: project_name, username });
        if (!projectExists) {
            return res.status(404).json({ message: 'No such project exists for this user' });
        }

        // Check if a task with the same name already exists for the user and project
        const taskExists = await Task.findOne({ project_name, username, task_name });
        if (taskExists) {
            return res.status(400).json({ message: 'Task with the same name already exists for this user and project' });
        }

        // Create the task if it does not already exist
        const task = new Task({ project_name, username, task_name, title, description });
        await task.save();
        res.status(201).json(task);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const updateTaskStatus = async (req, res) => {
    const taskId = req.params.taskId;
    const { status } = req.body;

    try {
        const task = await Task.findByIdAndUpdate(taskId, { status }, { new: true });
        res.status(200).json(task);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const deleteTask = async (req, res) => {
    const { username, project_name, task_name } = req.body;

    try {
        // Check if the task exists for the given user and project
        const taskExists = await Task.findOne({ username, project_name, task_name });
        if (!taskExists) {
            return res.status(404).json({ message: 'No such task exists for this user and project' });
        }

        // Delete the task if it exists
        await Task.findByIdAndDelete(taskExists._id);
        res.status(200).json({ message: 'Task deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


export const getTasksByUserAndProject = async (req, res) => {
    const { username, project_name } = req.body; 

    try {
        // Check if the project exists for the user
        const projectExists = await Project.findOne({ name: project_name, username });
        if (!projectExists) {
            return res.status(404).json({ message: 'No such project exists for this user' });
        }

        // Find tasks associated with the user and project
        const tasks = await Task.find({ username, project_name });
        if (tasks.length === 0) {
            return res.status(200).json({ message: 'No tasks available for this project' });
        }

        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
