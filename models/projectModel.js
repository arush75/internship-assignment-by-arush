import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
    username: { type: String, required: true }, // Store the username
    name: { type: String, required: true },
    description: { type: String, required: true },
});

const Project = mongoose.model('Project', projectSchema);
export default Project;
