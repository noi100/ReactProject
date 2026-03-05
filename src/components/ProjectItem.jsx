import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Grid, Typography, Paper, Box, Button, IconButton, Stack, Card, CardContent, Chip } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { deleteProject, deleteTask } from '../Store/projectSlice';
import TaskItem from './TaskItem';

export default function ProjectItem() {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
    const [taskToEdit, setTaskToEdit] = useState(null);

    const project = useSelector(state => state.project.allProjects.find(p => p.id === Number(id)));

    if (!project) return <Typography variant="h5" sx={{ p: 5, textAlign: 'center' }}>הפרויקט לא נמצא</Typography>;

    const columns = [
        { title: "לביצוע", status: "ToDo", color: "#f4f6f8" },
        { title: "בביצוע", status: "InProgress", color: "#fff9db" },
        { title: "בבדיקה", status: "Testing", color: "#e3f2fd" },
        { title: "בוצע", status: "Done", color: "#e8f5e9" }
    ];

    return (
        <Box sx={{ p: 3, bgcolor: '#fafafa', minHeight: '100vh' }}>
            <Paper sx={{ p: 3, mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="h4" fontWeight="bold">{project.name}</Typography>
                <Stack direction="row" spacing={2}>
                    <Button variant="outlined" startIcon={<EditIcon />} onClick={() => navigate('/AddProject', { state: { projectToEdit: project } })}>ערוך</Button>
                    <Button variant="outlined" color="error" onClick={() => { if(window.confirm("למחוק פרויקט?")) { dispatch(deleteProject(project.id)); navigate('/projects'); } }}>מחק</Button>
                </Stack>
            </Paper>

            <Grid container spacing={3}>
                {columns.map(col => (
                    <Grid item xs={12} md={3} key={col.status}>
                        <Paper sx={{ p: 2, bgcolor: col.color, minHeight: '70vh' }}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                                <Typography fontWeight="bold">{col.title}</Typography>
                                <IconButton size="small" onClick={() => { setTaskToEdit(null); setIsTaskModalOpen(true); }}><AddIcon /></IconButton>
                            </Box>
                            <Stack spacing={2}>
                                {project.tasks?.filter(t => t.status === col.status).map(task => (
                                    <Card key={task.id}>
                                        <CardContent>
                                            <Typography variant="subtitle2" fontWeight="bold">{task.title}</Typography>
                                            <Typography variant="caption" display="block" color="text.secondary">{task.description}</Typography>
                                            
                                            {/* הצגת פרטים נוספים על הכרטיסייה */}
                                            <Stack direction="row" spacing={1} sx={{ mt: 1, alignItems: 'center' }}>
                                                <Chip label={task.priority} size="small" color={task.priority === 'High' ? 'error' : 'default'} />
                                                {task.dueDate && (
                                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, ml: 'auto' }}>
                                                        <CalendarMonthIcon sx={{ fontSize: 14 }} />
                                                        <Typography variant="caption">{task.dueDate}</Typography>
                                                    </Box>
                                                )}
                                            </Stack>

                                            <Box sx={{ mt: 1, textAlign: 'left' }}>
                                                <IconButton size="small" onClick={() => { setTaskToEdit(task); setIsTaskModalOpen(true); }}><EditIcon fontSize="small" /></IconButton>
                                                <IconButton size="small" color="error" onClick={() => dispatch(deleteTask({ projectId: id, task }))}><DeleteIcon fontSize="small" /></IconButton>
                                            </Box>
                                        </CardContent>
                                    </Card>
                                ))}
                            </Stack>
                        </Paper>
                    </Grid>
                ))}
            </Grid>
            <TaskItem open={isTaskModalOpen} onClose={() => setIsTaskModalOpen(false)} taskToEdit={taskToEdit} />
        </Box>
    );
}