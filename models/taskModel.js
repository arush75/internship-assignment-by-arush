import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
    project_name: { type: String, required: true },
    username: { type: String, required: true },
    task_name: { type: String, required: true }, // Add task name field
    title: { type: String, required: true },
    description: { type: String },
    status: { type: String, default: 'Pending' }, // Task status can be 'Pending', 'In Progress', 'Completed', etc.
});

const Task = mongoose.model('Task', taskSchema);
export default Task;
