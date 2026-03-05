import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, Stack, MenuItem } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addTaskToProject, updateTask } from '../Store/projectSlice';

const initialState = {
    title: '',
    description: '',
    priority: 'Medium',
    dueDate: '',
    status: 'ToDo'
};

export default function TaskItem({ open, onClose, taskToEdit }) {
    const { id } = useParams();
    const dispatch = useDispatch();
    const [task, setTask] = useState(initialState);

    useEffect(() => {
        // התיקון: מעדכנים רק כשהמודאל נפתח (open === true)
        if (open) {
            if (taskToEdit) {
                setTask({ ...initialState, ...taskToEdit });
            } else {
                setTask(initialState);
            }
        }
    }, [open, taskToEdit]); // שים לב: אנחנו תלויים ב-open וב-taskToEdit

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTask(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = () => {
        if (!task.title) return alert("חובה להזין שם משימה");
        if (taskToEdit) {
            dispatch(updateTask({ projectId: id, task }));
        } else {
            dispatch(addTaskToProject({ projectId: id, task }));
        }
        onClose();
    };

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
            <DialogTitle sx={{ fontWeight: "bold", bgcolor: '#f5f5f5' }}>
                {taskToEdit ? `עריכת משימה: ${task.title}` : "הוספת משימה חדשה"}
            </DialogTitle>
            <DialogContent dividers>
                <Stack spacing={3} sx={{ mt: 1 }}>
                    <TextField name="title" label="שם המשימה" fullWidth required value={task.title || ''} onChange={handleChange} />
                    <TextField name="description" label="תיאור המשימה" fullWidth multiline rows={3} value={task.description || ''} onChange={handleChange} />
                    <Stack direction="row" spacing={2}>
                        <TextField select name="priority" label="עדיפות" fullWidth value={task.priority || 'Medium'} onChange={handleChange}>
                            <MenuItem value="Low">נמוכה</MenuItem>
                            <MenuItem value="Medium">בינונית</MenuItem>
                            <MenuItem value="High">גבוהה</MenuItem>
                        </TextField>
                        <TextField select name="status" label="סטטוס" fullWidth value={task.status || 'ToDo'} onChange={handleChange}>
                            <MenuItem value="ToDo">לביצוע</MenuItem>
                            <MenuItem value="InProgress">בביצוע</MenuItem>
                            <MenuItem value="Testing">בבדיקה</MenuItem>
                            <MenuItem value="Done">בוצע</MenuItem>
                        </TextField>
                    </Stack>
                    <TextField 
                        name="dueDate" 
                        label="תאריך יעד" 
                        type="date" 
                        fullWidth 
                        InputLabelProps={{ shrink: true }} 
                        value={task.dueDate || ''} 
                        onChange={handleChange} 
                    />
                </Stack>
            </DialogContent>
            <DialogActions sx={{ p: 2, bgcolor: '#f5f5f5' }}>
                <Button onClick={onClose} color="inherit">ביטול</Button>
                <Button onClick={handleSubmit} variant="contained" color={taskToEdit ? "secondary" : "primary"}>
                    {taskToEdit ? "עדכן" : "שמור"}
                </Button>
            </DialogActions>
        </Dialog>
    );
}