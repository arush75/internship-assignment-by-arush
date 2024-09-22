import User from '../models/userModel.js'; 
import Project from '../models/projectModel.js'; 
import Task from '../models/taskModel.js'; 

// Create Project Function
export const createProject = async (req, res) => {
    const { username, name, description } = req.body;

    try {
        // Check if the user exists by username
        const userExists = await User.findOne({ username });
        if (!userExists) {
            return res.status(404).json({ message: 'No such user exists. Project cannot be created.' });
        }

        // Check if a project with the same name already exists for the user
        const projectExists = await Project.findOne({ username, name });
        if (projectExists) {
            return res.status(400).json({ message: 'Project with this name already exists for this user.' });
        }

        // Create the project if the user exists and project name is unique
        const project = new Project({ username, name, description });
        await project.save();
        res.status(201).json(project);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get User Projects Function
export const getUserProjects = async (req, res) => {
    const { username } = req.body;

    try {
        // Check if the user exists by username
        const userExists = await User.findOne({ username });
        if (!userExists) {
            return res.status(404).json({ message: 'No such user exists. Cannot retrieve projects.' });
        }

        const projects = await Project.find({ username });
      

        // Check if projects array is empty
        if (projects.length === 0) {
            return res.status(200).json({ message: 'No projects available for user' });
        } else {
            return res.status(200).json({ username, projects });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


export const deleteProject = async (req, res) => {
    const { username, projectName } = req.body;

    try {
        // Check if the user exists by username
        const userExists = await User.findOne({ username });
        if (!userExists) {
            return res.status(404).json({ message: 'No such user exists. Cannot delete project.' });
        }

        // Check if the project exists for the user
        const project = await Project.findOne({ username, name: projectName });
        if (!project) {
            return res.status(404).json({ message: 'No such project found for this user.' });
        }

        // Delete all tasks associated with the project and username
        await Task.deleteMany({ project_name: projectName, username });

        // Delete the project
        await Project.findByIdAndDelete(project._id);
        res.status(200).json({ message: 'Project and associated tasks deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
