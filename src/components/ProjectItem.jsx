import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
    Grid, Typography, Paper, Box, Button,
    IconButton, Stack, Divider, Card, CardContent, Chip, Tooltip
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

// ייבוא הפעולות מה-Slice שלך
import { deleteProject } from '../Store/projectSlice';
import TaskItem from './TaskItem';

export default function ProjectItem() {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);

    // שליפת הפרויקט מה-Redux
    const project = useSelector(state =>
        state.project.allProjects.find(p => p.id === Number(id))
    );

    if (!project) return (
        <Typography variant="h5" sx={{ p: 5, textAlign: 'center' }}>
            הפרויקט לא נמצא
        </Typography>
    );

    const handleDeleteProject = () => {
        if (window.confirm(`האם למחוק את הפרויקט "${project?.name}"?`)) {
            dispatch(deleteProject(Number(id)));
            navigate('/projects');
        }
    };

    // הגדרת העמודות והסטטוסים
    const columns = [
        { title: "משימות לביצוע", status: "ToDo", color: "#f4f6f8" },
        { title: "בביצוע מפתח", status: "InProgress", color: "#fff9db" },
        { title: "מוכן לבדיקה", status: "Testing", color: "#e3f2fd" },
        { title: "בוצע ונבדק", status: "Done", color: "#e8f5e9" }
    ];

    return (
        <Box sx={{ width: '100%', minHeight: '100vh', bgcolor: '#fafafa', display: 'flex', flexDirection: 'column' }}>
            
            {/* באנר עליון - כותרת וניהול פרויקט */}
            <Box sx={{ p: { xs: 1, md: 3 } }}>
                <Paper elevation={0} sx={{ 
                    p: 3, mb: 1, borderRadius: 3, 
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center', 
                    border: '1px solid #eee', bgcolor: 'white'
                }}>
                    <Box>
                        <Typography variant="h4" fontWeight="800" color="primary">{project.name}</Typography>
                        <Typography variant="body1" color="text.secondary">{project.description}</Typography>
                    </Box>
                    <Stack direction="row" spacing={1}>
                        <Button onClick={() => navigate('/AddProject', { state: { projectToEdit: project } })} startIcon={<EditIcon />} variant="outlined">ערוך פרויקט</Button>
                        <Button onClick={handleDeleteProject} startIcon={<DeleteIcon />} variant="outlined" color="error">מחק פרויקט</Button>
                    </Stack>
                </Paper>
            </Box>

            {/* לוח המשימות - קנבן */}
            <Box sx={{ flexGrow: 1, p: { xs: 1, md: 3 }, pt: 0 }}>
                <Grid container spacing={2}>
                    {columns.map((col) => (
                        <Grid item xs={12} sm={6} md={3} key={col.status}>
                            <Paper elevation={0} sx={{ 
                                p: 2, bgcolor: col.color, borderRadius: 2, 
                                minHeight: '75vh', border: '1px solid rgba(0,0,0,0.05)'
                            }}>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                                    <Typography variant="subtitle1" fontWeight="bold">{col.title}</Typography>
                                    <IconButton onClick={() => setIsTaskModalOpen(true)} size="small" sx={{ bgcolor: 'white' }}>
                                        <AddIcon fontSize="small" color="primary" />
                                    </IconButton>
                                </Box>
                                <Divider sx={{ mb: 2 }} />

                                <Stack spacing={2}>
                                    {project.tasks?.filter(t => t.status === col.status).map((task) => (
                                        <Card key={task.id} sx={{ 
                                            position: 'relative', 
                                            borderRadius: 2, 
                                            boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
                                            '&:hover .task-actions': { opacity: 1 } 
                                        }}>
                                            <CardContent sx={{ p: 2 }}>
                                                
                                                {/* כפתורי עריכה ומחיקה בריחוף */}
                                                <Box className="task-actions" sx={{ 
                                                    position: 'absolute', top: 5, left: 5, 
                                                    opacity: 0, transition: '0.2s',
                                                    display: 'flex', gap: 0.5,
                                                    bgcolor: 'rgba(255, 255, 255, 0.9)', borderRadius: 2, p: 0.5, boxShadow: 1
                                                }}>
                                                    <Tooltip title="ערוך">
                                                        <IconButton size="small" onClick={() => console.log("Edit Task", task.id)}>
                                                            <EditIcon sx={{ fontSize: 16, color: 'primary.main' }} />
                                                        </IconButton>
                                                    </Tooltip>
                                                    <Tooltip title="מחק">
                                                        <IconButton size="small" onClick={() => console.log("Delete Task", task.id)}>
                                                            <DeleteIcon sx={{ fontSize: 16, color: 'error.main' }} />
                                                        </IconButton>
                                                    </Tooltip>
                                                </Box>

                                                {/* כותרת המשימה */}
                                                <Typography variant="subtitle2" fontWeight="bold" sx={{ pr: 6, mb: 1 }}>
                                                    {task.title}
                                                </Typography>
                                                
                                                {/* תיאור המשימה */}
                                                <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 2 }}>
                                                    {task.description || "אין תיאור"}
                                                </Typography>

                                                {/* שורת סטטוס ועדיפות */}
                                                <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                                                    {/* הצגת הסטטוס */}
                                                    <Chip 
                                                        label={task.status} 
                                                        size="small" 
                                                        variant="contained" 
                                                        sx={{ fontSize: 9, height: 18, bgcolor: 'action.selected' }} 
                                                    />
                                                    
                                                    {/* הצגת העדיפות */}
                                                    <Chip 
                                                        label={task.priority} 
                                                        size="small" 
                                                        variant="outlined" 
                                                        color={task.priority === 'High' ? 'error' : 'default'}
                                                        sx={{ fontSize: 9, height: 18 }} 
                                                    />

                                                    {/* תאריך יעד */}
                                                    {task.dueDate && (
                                                        <Box sx={{ display: 'flex', alignItems: 'center', color: 'text.secondary', ml: 'auto' }}>
                                                            <CalendarMonthIcon sx={{ fontSize: 12, mr: 0.5 }} />
                                                            <Typography variant="caption" sx={{ fontSize: 10 }}>{task.dueDate}</Typography>
                                                        </Box>
                                                    )}
                                                </Stack>
                                            </CardContent>
                                        </Card>
                                    ))}
                                </Stack>
                            </Paper>
                        </Grid>
                    ))}
                </Grid>
            </Box>

            {/* מודל להוספת משימה */}
            <TaskItem open={isTaskModalOpen} onClose={() => setIsTaskModalOpen(false)} /> 
        </Box>
    );
}