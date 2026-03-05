import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, Stack, MenuItem, Box, Typography, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
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
        if (open) {
            if (taskToEdit) {
                setTask({ ...initialState, ...taskToEdit });
            } else {
                setTask(initialState);
            }
        }
    }, [open, taskToEdit]);

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

    const inputSx = {
        '& .MuiOutlinedInput-root': {
            backgroundColor: 'rgba(255,255,255,0.03)',
            borderRadius: '10px',
            fontFamily: 'var(--font-body)',
            color: 'var(--text-primary)',
            '& fieldset': { borderColor: 'var(--border-default)' },
            '&:hover fieldset': { borderColor: 'rgba(0,229,195,0.35)' },
            '&.Mui-focused fieldset': {
                borderColor: 'var(--accent-primary)',
                borderWidth: '1px',
                boxShadow: '0 0 0 3px rgba(0,229,195,0.08)',
            },
        },
        '& .MuiInputLabel-root': {
            color: 'var(--text-secondary)',
            fontFamily: 'var(--font-body)',
            '&.Mui-focused': { color: 'var(--accent-primary)' },
        },
        '& .MuiOutlinedInput-input': {
            color: 'var(--text-primary)',
            fontFamily: 'var(--font-body)',
        },
        '& .MuiSelect-icon': { color: 'var(--text-secondary)' },
    };

    const menuItemSx = {
        fontFamily: 'var(--font-body)',
        color: 'var(--text-primary)',
        fontSize: '0.875rem',
        '&:hover': { bgcolor: 'rgba(255,255,255,0.05)' },
        '&.Mui-selected': {
            bgcolor: 'rgba(0,229,195,0.1)',
            '&:hover': { bgcolor: 'rgba(0,229,195,0.15)' },
        },
    };

    return (
        <Dialog
            open={open}
            onClose={onClose}
            fullWidth
            maxWidth="sm"
            PaperProps={{
                sx: {
                    bgcolor: 'var(--bg-surface)',
                    backgroundImage: 'none',
                    border: '1px solid var(--border-default)',
                    borderRadius: '20px',
                    boxShadow: 'var(--shadow-lg)',
                    overflow: 'hidden',
                }
            }}
        >
            {/* Header */}
            <Box sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                px: 3,
                py: 2.5,
                borderBottom: '1px solid var(--border-subtle)',
                background: 'rgba(255,255,255,0.02)',
            }}>
                <Box>
                    <Typography sx={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.68rem',
                        color: 'var(--accent-primary)',
                        letterSpacing: '0.08em',
                        textTransform: 'uppercase',
                        mb: 0.3,
                    }}>
                        {taskToEdit ? 'עריכה' : 'משימה חדשה'}
                    </Typography>
                    <Typography sx={{
                        fontWeight: 700,
                        fontSize: '1rem',
                        color: 'var(--text-primary)',
                        fontFamily: 'var(--font-body)',
                        letterSpacing: '-0.3px',
                    }}>
                        {taskToEdit ? `עריכת: ${task.title || ''}` : "הוספת משימה"}
                    </Typography>
                </Box>
                <IconButton
                    onClick={onClose}
                    sx={{
                        color: 'var(--text-secondary)',
                        borderRadius: '10px',
                        width: 36,
                        height: 36,
                        '&:hover': {
                            bgcolor: 'rgba(255,255,255,0.06)',
                            color: 'var(--text-primary)',
                        }
                    }}
                >
                    <CloseIcon fontSize="small" />
                </IconButton>
            </Box>

            {/* Content */}
            <DialogContent sx={{ p: 3 }}>
                <Stack spacing={2.5} sx={{ mt: 0.5 }}>
                    <TextField
                        name="title"
                        label="שם המשימה"
                        fullWidth
                        required
                        value={task.title || ''}
                        onChange={handleChange}
                        sx={inputSx}
                    />
                    <TextField
                        name="description"
                        label="תיאור המשימה"
                        fullWidth
                        multiline
                        rows={3}
                        value={task.description || ''}
                        onChange={handleChange}
                        sx={inputSx}
                    />
                    <Stack direction="row" spacing={2}>
                        <TextField
                            select
                            name="priority"
                            label="עדיפות"
                            fullWidth
                            value={task.priority || 'Medium'}
                            onChange={handleChange}
                            sx={inputSx}
                            SelectProps={{
                                MenuProps: {
                                    PaperProps: {
                                        sx: {
                                            bgcolor: 'var(--bg-elevated)',
                                            border: '1px solid var(--border-default)',
                                            borderRadius: '12px',
                                            boxShadow: 'var(--shadow-md)',
                                        }
                                    }
                                }
                            }}
                        >
                            <MenuItem value="Low" sx={menuItemSx}>נמוכה</MenuItem>
                            <MenuItem value="Medium" sx={menuItemSx}>בינונית</MenuItem>
                            <MenuItem value="High" sx={menuItemSx}>גבוהה</MenuItem>
                        </TextField>
                        <TextField
                            select
                            name="status"
                            label="סטטוס"
                            fullWidth
                            value={task.status || 'ToDo'}
                            onChange={handleChange}
                            sx={inputSx}
                            SelectProps={{
                                MenuProps: {
                                    PaperProps: {
                                        sx: {
                                            bgcolor: 'var(--bg-elevated)',
                                            border: '1px solid var(--border-default)',
                                            borderRadius: '12px',
                                            boxShadow: 'var(--shadow-md)',
                                        }
                                    }
                                }
                            }}
                        >
                            <MenuItem value="ToDo" sx={menuItemSx}>לביצוע</MenuItem>
                            <MenuItem value="InProgress" sx={menuItemSx}>בביצוע</MenuItem>
                            <MenuItem value="Testing" sx={menuItemSx}>בבדיקה</MenuItem>
                            <MenuItem value="Done" sx={menuItemSx}>בוצע</MenuItem>
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
                        sx={inputSx}
                    />
                </Stack>
            </DialogContent>

            {/* Actions */}
            <Box sx={{
                display: 'flex',
                gap: 2,
                px: 3,
                py: 2.5,
                borderTop: '1px solid var(--border-subtle)',
                background: 'rgba(255,255,255,0.02)',
            }}>
                <Button
                    onClick={onClose}
                    fullWidth
                    sx={{
                        fontFamily: 'var(--font-body)',
                        fontWeight: 600,
                        py: 1.3,
                        borderRadius: '10px',
                        color: 'var(--text-secondary)',
                        bgcolor: 'transparent',
                        border: '1px solid var(--border-default)',
                        textTransform: 'none',
                        '&:hover': {
                            bgcolor: 'rgba(255,255,255,0.04)',
                            color: 'var(--text-primary)',
                        }
                    }}
                >
                    ביטול
                </Button>
                <Button
                    onClick={handleSubmit}
                    fullWidth
                    variant="contained"
                    sx={{
                        fontFamily: 'var(--font-body)',
                        fontWeight: 700,
                        py: 1.3,
                        borderRadius: '10px',
                        background: taskToEdit
                            ? 'linear-gradient(135deg, #7c6af7 0%, #a79cf7 100%)'
                            : 'linear-gradient(135deg, #00e5c3 0%, #7c6af7 100%)',
                        color: '#0d1117',
                        textTransform: 'none',
                        border: 'none',
                        boxShadow: taskToEdit
                            ? '0 4px 16px rgba(124,106,247,0.3)'
                            : '0 4px 16px rgba(0,229,195,0.3)',
                        '&:hover': {
                            background: taskToEdit
                                ? 'linear-gradient(135deg, #8c7aff 0%, #b8adff 100%)'
                                : 'linear-gradient(135deg, #00f5d3 0%, #8c7aff 100%)',
                            boxShadow: '0 6px 24px rgba(0,229,195,0.4)',
                        }
                    }}
                >
                    {taskToEdit ? "עדכן" : "שמור"}
                </Button>
            </Box>
        </Dialog>
    );
}
