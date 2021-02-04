import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema(
  {
    createdUser: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    userName: { type: String, required: true },
    email: { type: String, required: true },
    text: { type: String, required: true },
    status: { type: Number, default: 0, required: true },
  },
  {
    timestamps: true,
  },
);

const Task = mongoose.model('Task', taskSchema);
export default Task;
