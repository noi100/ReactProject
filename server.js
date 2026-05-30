import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

let projects = [];

app.get('/api/projects', (req, res) => {
  res.json(projects);
});

app.post('/api/projects', (req, res) => {
  const project = {
    ...req.body,
    id: Date.now(),
    tasks: req.body.tasks || [],
  };

  projects.push(project);
  res.status(201).json(project);
});

app.post('/api/projects/:projectId/tasks', (req, res) => {
  const projectId = Number(req.params.projectId);
  const project = projects.find(p => p.id === projectId);

  if (!project) {
    return res.status(404).json({ message: 'Project not found' });
  }

  const task = {
    ...req.body,
    id: Date.now(),
  };

  if (!project.tasks) project.tasks = [];
  project.tasks.push(task);

  res.status(201).json({ projectId, task });
});

app.put('/api/projects/:projectId/tasks/:taskId', (req, res) => {
  const projectId = Number(req.params.projectId);
  const taskId = Number(req.params.taskId);
  const project = projects.find(p => p.id === projectId);

  if (!project) {
    return res.status(404).json({ message: 'Project not found' });
  }

  if (!project.tasks) project.tasks = [];
  const taskIndex = project.tasks.findIndex(t => t.id === taskId);

  if (taskIndex === -1) {
    return res.status(404).json({ message: 'Task not found' });
  }

  const updatedTask = {
    ...project.tasks[taskIndex],
    ...req.body,
    id: taskId,
  };

  project.tasks[taskIndex] = updatedTask;
  res.json({ projectId, task: updatedTask });
});

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Backend running on http://localhost:${port}`);
});
