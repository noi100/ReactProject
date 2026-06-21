process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';

const app = express();

app.use((req, res, next) => {
  res.setHeader(
    'Content-Security-Policy',
    "default-src * 'unsafe-inline' 'unsafe-eval'; script-src * 'unsafe-inline' 'unsafe-eval'; connect-src * 'unsafe-inline' 'unsafe-eval'; style-src * 'unsafe-inline';"
  );
  next();
});

app.use(cors());
app.use(express.json());

const mongoUser = encodeURIComponent(process.env.MONGO_USER || '');
const mongoPass = encodeURIComponent(process.env.MONGO_PASS || '');
const mongoHost = process.env.MONGO_HOST || '';
const mongoDb = process.env.MONGO_DB || '';
const mongoUri =
  process.env.MONGO_URI ||
  `mongodb+srv://${mongoUser}:${mongoPass}@${mongoHost}/${mongoDb}?retryWrites=true&w=majority`;

const mongooseOptions = {
  bufferCommands: false,
  serverSelectionTimeoutMS: 30000,
  socketTimeoutMS: 45000,
  connectTimeoutMS: 15000,
};

mongoose.set('strictQuery', false);

console.log('⏳ Trying to connect to MongoDB Atlas...');

mongoose
  .connect(mongoUri, mongooseOptions)
  .then(() => {
    console.log('✓ Connected to MongoDB successfully!');
    startServer();
  })
  .catch((err) => {
    console.error('✗ MongoDB connection error:', err);
  });

mongoose.connection.on('error', (err) => {
  console.error('MongoDB runtime error:', err);
});

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  completed: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

const projectSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  tasks: [taskSchema],
  createdAt: { type: Date, default: Date.now },
});

const Project = mongoose.model('Project', projectSchema);

app.get('/api/projects', async (req, res) => {
  try {
    const projects = await Project.find().lean();
    res.json(projects);
  } catch (err) {
    console.error('Error fetching projects:', err);
    res.status(500).json({ message: 'Error fetching projects', error: err.message });
  }
});

app.get('/api/projects/:projectId', async (req, res) => {
  try {
    const project = await Project.findById(req.params.projectId).lean();

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    res.json(project);
  } catch (err) {
    console.error('Error fetching project:', err);
    res.status(500).json({ message: 'Error fetching project', error: err.message });
  }
});

app.post('/api/projects', async (req, res) => {
  try {
    if (!req.body.name) {
      return res.status(400).json({ message: 'Project name is required' });
    }

    const project = new Project({
      name: req.body.name,
      description: req.body.description || '',
      tasks: Array.isArray(req.body.tasks) ? req.body.tasks : [],
    });

    const savedProject = await project.save();
    res.status(201).json(savedProject);
  } catch (err) {
    console.error('Error creating project:', err);
    res.status(500).json({ message: 'Error creating project', error: err.message });
  }
});

app.put('/api/projects/:projectId', async (req, res) => {
  try {
    const project = await Project.findById(req.params.projectId);

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    if (req.body.name !== undefined) {
      project.name = req.body.name;
    }

    if (req.body.description !== undefined) {
      project.description = req.body.description;
    }

    const updatedProject = await project.save();
    res.json(updatedProject);
  } catch (err) {
    console.error('Error updating project:', err);
    res.status(500).json({ message: 'Error updating project', error: err.message });
  }
});

app.post('/api/projects/:projectId/tasks', async (req, res) => {
  try {
    const project = await Project.findById(req.params.projectId);

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    if (!req.body.title) {
      return res.status(400).json({ message: 'Task title is required' });
    }

    const task = {
      title: req.body.title,
      description: req.body.description || '',
      completed: req.body.completed === true,
    };

    project.tasks.push(task);

    await project.save();

    res.status(201).json({
      projectId: project._id,
      task: project.tasks[project.tasks.length - 1],
    });
  } catch (err) {
    console.error('Error creating task:', err);
    res.status(500).json({ message: 'Error creating task', error: err.message });
  }
});

app.put('/api/projects/:projectId/tasks/:taskId', async (req, res) => {
  try {
    const project = await Project.findById(req.params.projectId);

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    const task = project.tasks.id(req.params.taskId);

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    if (req.body.title !== undefined) {
      task.title = req.body.title;
    }

    if (req.body.description !== undefined) {
      task.description = req.body.description;
    }

    if (req.body.completed !== undefined) {
      task.completed = req.body.completed;
    }

    await project.save();

    res.json({ projectId: project._id, task });
  } catch (err) {
    console.error('Error updating task:', err);
    res.status(500).json({ message: 'Error updating task', error: err.message });
  }
});

function startServer() {
  const port = process.env.PORT || 4000;
  app.listen(port, () => {
    console.log(`✓ Backend running on http://localhost:${port}`);
  });
}