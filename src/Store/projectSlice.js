import { createSlice } from '@reduxjs/toolkit';

const projectSlice = createSlice({
    name: 'project',
    initialState: {
        allProjects: [],
    },
    reducers: {
        // הוספת פרויקט
        setProject: (state, action) => {
            state.allProjects.push(action.payload);
        },
        // מחיקת פרויקט
        deleteProject: (state, action) => {
            state.allProjects = state.allProjects.filter(p => p.id !== action.payload);
        },
        // עדכון פרויקט
        updateProject: (state, action) => {
            const index = state.allProjects.findIndex(p => p.id === action.payload.id);
            if (index !== -1) {
                state.allProjects[index] = action.payload;
            }
        },
        // הוספת מסימה לפרויקט מסויים לפי ה- ID
        addTaskToProject: (state, action) => {
            const { projectId, task } = action.payload;
            const project = state.allProjects.find(p => p.id === Number(projectId));
            if (project) {
                if (!project.tasks) project.tasks = [];
                project.tasks.push({ ...task, id: Date.now() });
            }
        },
        // מחיקת מסימה מפרויקט מסויים לפי ה- ID
        deleteTask: (state, action) => {
            const { projectId, task } = action.payload;
            const project = state.allProjects.find(p => p.id === Number(projectId));
            if (project && project.tasks) {
                project.tasks = project.tasks.filter(t => t.id !== task.id);
            }
        },
        // עדכון מסימה מפרויקט מסויים לפי ה- ID
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