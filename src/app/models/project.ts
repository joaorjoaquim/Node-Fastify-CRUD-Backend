import { model, Schema, Document } from "mongoose";

interface IProject extends Document {
  title: String;
  description: String;
  user: Schema.Types.ObjectId;
  tasks: Schema.Types.ObjectId;
  createdAt: Date;
}

const ProjectSchema: Schema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    require: true,
  },
  tasks: [
    {
      type: Schema.Types.ObjectId,
      ref: "Task",
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Project = model<IProject>("Project", ProjectSchema);

module.exports = Project;
