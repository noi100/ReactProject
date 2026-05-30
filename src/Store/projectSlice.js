import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const API_BASE = 'http://localhost:4000/api/projects';

export const fetchProjectsAsync = createAsyncThunk(
  'project/fetchProjectsAsync',
  async (_, thunkAPI) => {
    try {
      const response = await fetch(API_BASE);
      if (!response.ok) {
        const errorText = await response.text();
        return thunkAPI.rejectWithValue(errorText || 'Failed to load projects');
      }
      return await response.json();
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const addProjectAsync = createAsyncThunk(
  'project/addProjectAsync',
  async (project, thunkAPI) => {
    try {
      const response = await fetch(API_BASE, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(project),
      });

      if (!response.ok) {
        const errorText = await response.text();
        return thunkAPI.rejectWithValue(errorText || 'Failed to save project');
      }

      return await response.json();
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const addTaskToProjectAsync = createAsyncThunk(
  'project/addTaskToProjectAsync',
  async ({ projectId, task }, thunkAPI) => {
    try {
      const response = await fetch(`${API_BASE}/${projectId}/tasks`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(task),
      });

      if (!response.ok) {
        const errorText = await response.text();
        return thunkAPI.rejectWithValue(errorText || 'Failed to add task');
      }

      return await response.json();
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const updateTaskAsync = createAsyncThunk(
  'project/updateTaskAsync',
  async ({ projectId, task }, thunkAPI) => {
    try {
      const response = await fetch(`${API_BASE}/${projectId}/tasks/${task.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(task),
      });

      if (!response.ok) {
        const errorText = await response.text();
        return thunkAPI.rejectWithValue(errorText || 'Failed to update task');
      }

      return await response.json();
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const projectSlice = createSlice({
  name: 'project',
  initialState: {
    allProjects: [],
    status: 'idle',
    error: null,
  },
  reducers: {
    deleteProject: (state, action) => {
      state.allProjects = state.allProjects.filter(p => p.id !== action.payload);
    },
    updateProject: (state, action) => {
      const index = state.allProjects.findIndex(p => p.id === action.payload.id);
      if (index !== -1) {
        state.allProjects[index] = action.payload;
      }
    },
    addTaskToProject: (state, action) => {
      const { projectId, task } = action.payload;
      const project = state.allProjects.find(p => p.id === Number(projectId));
      if (project) {
        if (!project.tasks) project.tasks = [];
        project.tasks.push({ ...task, id: Date.now() });
      }
    },
    deleteTask: (state, action) => {
      const { projectId, task } = action.payload;
      const project = state.allProjects.find(p => p.id === Number(projectId));
      if (project && project.tasks) {
        project.tasks = project.tasks.filter(t => t.id !== task.id);
      }
    },
    updateTask: (state, action) => {
      const { projectId, task } = action.payload;
      const project = state.allProjects.find(p => p.id === Number(projectId));
      if (project && project.tasks) {
        const index = project.tasks.findIndex(t => t.id === task.id);
        if (index !== -1) {
          project.tasks[index] = task;
        }
      }
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchProjectsAsync.pending, state => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchProjectsAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.allProjects = action.payload;
      })
      .addCase(fetchProjectsAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || action.error.message;
      })
      .addCase(addProjectAsync.pending, state => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(addProjectAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.allProjects.push(action.payload);
      })
      .addCase(addProjectAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || action.error.message;
      })
      .addCase(addTaskToProjectAsync.pending, state => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(addTaskToProjectAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const { projectId, task } = action.payload;
        const project = state.allProjects.find(p => p.id === Number(projectId));
        if (project) {
          if (!project.tasks) project.tasks = [];
          project.tasks.push(task);
        }
      })
      .addCase(addTaskToProjectAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || action.error.message;
      })
      .addCase(updateTaskAsync.pending, state => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(updateTaskAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const { projectId, task } = action.payload;
        const project = state.allProjects.find(p => p.id === Number(projectId));
        if (project && project.tasks) {
          const index = project.tasks.findIndex(t => t.id === task.id);
          if (index !== -1) {
            project.tasks[index] = task;
          }
        }
      })
      .addCase(updateTaskAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || action.error.message;
      });
  },
});

export const {
  deleteProject,
  updateProject,
  addTaskToProject,
  deleteTask,
  updateTask,
} = projectSlice.actions;
export default projectSlice.reducer;
