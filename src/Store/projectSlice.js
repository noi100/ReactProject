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
        // פעולה חדשה והכרחית להוספת משימה!
        addTaskToProject: (state, action) => {
            const { projectId, task } = action.payload;
            const project = state.allProjects.find(p => p.id === Number(projectId));
            if (project) {
                if (!project.tasks) project.tasks = [];
                // הוספת משימה עם ID ייחודי (זמני)
                project.tasks.push({ ...task, id: Date.now() });
            }
        }
    }
});

export const { setProject, deleteProject, updateProject, addTaskToProject } = projectSlice.actions;

export const selectProjectById = (state, projectId) => 
    state.project.allProjects.find(p => p.id === Number(projectId));

export default projectSlice.reducer;