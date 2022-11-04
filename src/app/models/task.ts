import { model, Schema, Document } from "mongoose";

interface ITask extends Document {
  title: String;
  project: Schema.Types.ObjectId;
  assignedTo: Schema.Types.ObjectId;
  completed: Boolean;
  createdAt: Date;
}

const TaskSchema: Schema = new Schema({
  title: {
    type: String,
    required: true,
  },
  project: {
    type: Schema.Types.ObjectId,
    ref: "Project",
    require: true,
  },
  assignedTo: {
    type: Schema.Types.ObjectId,
    ref: "User",
    require: true,
  },
  completed: {
    type: Boolean,
    require: true,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Task = model<ITask>("Task", TaskSchema);

module.exports = Task;
