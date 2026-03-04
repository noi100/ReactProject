import React, { useState } from 'react'; // ייבוא תקין ויחיד
import {
    Dialog, DialogTitle, DialogContent, DialogActions,
    TextField, Button, Stack, MenuItem
} from '@mui/material';
import { useParams } from 'react-router-dom'; // חובה לייבא
import { useDispatch } from 'react-redux'; // חובה לייבא
import { addTaskToProject } from '../Store/projectSlice'; // חובה לייבא מה-Slice


export default function TaskItem({ open, onClose }) {
    const { id } = useParams();
    const dispatch = useDispatch();
    
 

    const [task, setTask] = useState({
        title: '',
        description: '',
        priority: 'Medium',
        dueDate: '',
        status: 'ToDo' // חשוב כדי שהמשימה תופיע בעמודה הראשונה
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTask(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = () => {
        if (!task.title) return alert("חובה להזין שם משימה");

        // שליחה ל-Redux
        dispatch(addTaskToProject({ projectId: id, task }));
        
        // איפוס הטופס וסגירה
        setTask({ title: '', description: '', priority: 'Medium', dueDate: '', status: 'ToDo' });
        onClose();
    };

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
            <DialogTitle sx={{ fontWeight: "bold" }}>הוספת משימה חדשה</DialogTitle>
            
            <DialogContent dividers>
                <Stack spacing={3} sx={{ mt: 1 }}>
                    <TextField
                        name="title"
                        label="שם המשימה"
                        fullWidth
                        value={task.title}
                        onChange={handleChange}
                    />
                    <TextField
                        name="description"
                        label="תיאור המשימה"
                        fullWidth
                        multiline
                        rows={3}
                        value={task.description}
                        onChange={handleChange}
                    />
                    <TextField
                        select
                        name="priority"
                        label="עדיפות"
                        value={task.priority}
                        onChange={handleChange}
                    >
                        <MenuItem value="Low">נמוכה</MenuItem>
                        <MenuItem value="Medium">בינונית</MenuItem>
                        <MenuItem value="High">גבוהה</MenuItem>
                    </TextField>
                    <TextField
                        name="dueDate"
                        label="תאריך יעד"
                        type="date"
                        fullWidth
                        InputLabelProps={{ shrink: true }}
                        value={task.dueDate}
                        onChange={handleChange}
                    />
                </Stack>
            </DialogContent>

            <DialogActions sx={{ p: 2 }}>
                <Button onClick={onClose} color="inherit">ביטול</Button>
                <Button onClick={handleSubmit} variant="contained" color="primary">
                    שמור משימה
                </Button>
            </DialogActions>
        </Dialog>
    );
}