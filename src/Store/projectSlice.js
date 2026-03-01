import { createSlice } from '@reduxjs/toolkit';

const projectSlice = createSlice({
    name: 'project',
    initialState: {
        allProjects: [], // מערך שיכיל את כל הפרויקטים של כולם (או שיימשך מה-DB)
    },
reducers: {
    // וודאי שזה השם המדויק
    setProject: (state, action) => {
      state.allProjects.push(action.payload);
    },
    deleteProject: (state, action) => {
            // action.payload יכיל את ה-ID של הפרויקט למחיקה
            state.allProjects = state.allProjects.filter(p => p.id !== action.payload);
        }
  }
});

export const { setProject } = projectSlice.actions;
export const {deleteProject}=projectSlice.actions;
export default projectSlice.reducer;