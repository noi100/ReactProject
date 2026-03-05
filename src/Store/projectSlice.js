import { createSlice } from '@reduxjs/toolkit';

const projectSlice = createSlice({
    name: 'project',
    initialState: {
        allProjects: [],
    },
    reducers: {
        setProject: (state, action) => {
            state.allProjects.push(action.payload);
        },
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
            // התיקון כאן: הוספת סימן שאלה או בדיקה שהמערך קיים
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
        }
    }
});

export const { setProject, deleteProject, updateProject, addTaskToProject, deleteTask, updateTask } = projectSlice.actions;
export default projectSlice.reducer;