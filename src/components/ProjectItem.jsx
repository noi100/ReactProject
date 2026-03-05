import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Grid, Typography, Box, Button, IconButton, Stack, Chip, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { deleteProject, deleteTask } from '../Store/projectSlice';
import TaskItem from './TaskItem';

export default function ProjectItem() {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
    const [taskToEdit, setTaskToEdit] = useState(null);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

    const project = useSelector(state => state.project.allProjects.find(p => p.id === Number(id)));

    if (!project) return (
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', bgcolor: 'var(--bg-base)' }}>
            <Typography sx={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-body)', fontSize: '1.2rem' }}>
                הפרויקט לא נמצא
            </Typography>
        </Box>
    );

    const columns = [
        { title: "לביצוע", status: "ToDo", color: 'rgba(139,148,158,0.06)', accent: '#8b949e', border: 'rgba(139,148,158,0.15)' },
        { title: "בביצוע", status: "InProgress", color: 'rgba(245,158,11,0.06)', accent: '#f59e0b', border: 'rgba(245,158,11,0.2)' },
        { title: "בבדיקה", status: "Testing", color: 'rgba(124,106,247,0.06)', accent: '#7c6af7', border: 'rgba(124,106,247,0.2)' },
        { title: "בוצע", status: "Done", color: 'rgba(0,229,195,0.06)', accent: '#00e5c3', border: 'rgba(0,229,195,0.2)' },
    ];

    const priorityMap = {
        High: { label: 'גבוהה', color: '#ef4444', bg: 'rgba(239,68,68,0.1)', border: 'rgba(239,68,68,0.25)' },
        Medium: { label: 'בינונית', color: '#f59e0b', bg: 'rgba(245,158,11,0.1)', border: 'rgba(245,158,11,0.25)' },
        Low: { label: 'נמוכה', color: '#10b981', bg: 'rgba(16,185,129,0.1)', border: 'rgba(16,185,129,0.25)' },
    };

    return (
        <Box sx={{ minHeight: '100vh', bgcolor: 'var(--bg-base)', pb: 6 }}>
            {/* Header */}
            <Box sx={{
                position: 'sticky',
                top: 0,
                zIndex: 10,
                background: 'rgba(13,17,23,0.9)',
                backdropFilter: 'blur(20px)',
                borderBottom: '1px solid var(--border-subtle)',
                px: { xs: 2, md: 4 },
                py: 2,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: 2,
                animation: 'fadeIn 0.3s ease forwards',
            }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <IconButton
                        onClick={() => navigate('/projects')}
                        sx={{
                            color: 'var(--text-secondary)',
                            borderRadius: '10px',
                            border: '1px solid var(--border-subtle)',
                            '&:hover': { bgcolor: 'rgba(255,255,255,0.05)', color: 'var(--text-primary)' }
                        }}
                    >
                        <ArrowBackIcon fontSize="small" />
                    </IconButton>

                    <Box>
                        <Typography sx={{
                            fontFamily: 'var(--font-mono)',
                            fontSize: '0.85rem',
                            color: 'var(--text-secondary)',
                            letterSpacing: '0.05em',
                            mb: 0.4,
                        }}>
                            פרויקט / {project.createdAt}
                        </Typography>
                        <Typography sx={{
                            fontWeight: 900,
                            fontSize: '2.8rem',
                            fontFamily: 'var(--font-body)',
                            letterSpacing: '-2px',
                            lineHeight: 1,
                            background: 'linear-gradient(135deg, #ffffff 0%, #00e5c3 100%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text',
                            textShadow: 'none',
                        }}>
                            {project.name}
                        </Typography>
                    </Box>
                </Box>

                <Stack direction="row" spacing={1.5}>
                    <Button
                        startIcon={<EditIcon sx={{ fontSize: '16px !important' }} />}
                        onClick={() => navigate('/AddProject', { state: { projectToEdit: project } })}
                        sx={{
                            fontFamily: 'var(--font-body)',
                            fontWeight: 600,
                            fontSize: '0.85rem',
                            px: 2.5,
                            py: 1,
                            borderRadius: '10px',
                            color: 'var(--text-secondary)',
                            bgcolor: 'transparent',
                            border: '1px solid var(--border-default)',
                            textTransform: 'none',
                            '& .MuiButton-startIcon': { marginLeft: 0.5, marginRight: -0.5 },
                            '&:hover': {
                                bgcolor: 'rgba(255,255,255,0.05)',
                                color: 'var(--text-primary)',
                                border: '1px solid var(--border-strong)',
                            }
                        }}
                    >
                        ערוך
                    </Button>
                    <Button
                        startIcon={<DeleteIcon sx={{ fontSize: '16px !important' }} />}
                        onClick={() => setDeleteDialogOpen(true)}
                        sx={{
                            fontFamily: 'var(--font-body)',
                            fontWeight: 600,
                            fontSize: '0.85rem',
                            px: 2.5,
                            py: 1,
                            borderRadius: '10px',
                            color: '#ef4444',
                            bgcolor: 'transparent',
                            border: '1px solid rgba(239,68,68,0.25)',
                            textTransform: 'none',
                            '& .MuiButton-startIcon': { marginLeft: 0.5, marginRight: -0.5 },
                            '&:hover': {
                                bgcolor: 'rgba(239,68,68,0.08)',
                                border: '1px solid rgba(239,68,68,0.5)',
                            }
                        }}
                    >
                        מחק
                    </Button>
                </Stack>
            </Box>

            {/* Kanban Board */}
            <Box sx={{ px: { xs: 2, md: 4 }, pt: 4, width: '100%' }}>
                <Grid container spacing={2.5} sx={{ width: '100%', margin: 0 }}>
                    {columns.map((col, colIdx) => (
                        <Grid item xs={12} sm={6} md={3} key={col.status} sx={{ flexGrow: 1 }}>
                            <Box sx={{
                                background: col.color,
                                border: `1px solid ${col.border}`,
                                borderRadius: '16px',
                                p: 2.5,
                                minHeight: '65vh',
                                display: 'flex',
                                flexDirection: 'column',
                                animation: `fadeUp 0.4s ease ${colIdx * 0.08}s both`,
                            }}>
                                {/* Column header */}
                                <Box sx={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    mb: 2.5,
                                    pb: 2,
                                    borderBottom: `1px solid ${col.border}`,
                                }}>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                                        <Box sx={{
                                            width: 8,
                                            height: 8,
                                            borderRadius: '50%',
                                            bgcolor: col.accent,
                                            boxShadow: `0 0 6px ${col.accent}66`,
                                        }} />
                                        <Typography sx={{
                                            fontWeight: 700,
                                            fontSize: '1.05rem',
                                            color: 'var(--text-primary)',
                                            fontFamily: 'var(--font-body)',
                                        }}>
                                            {col.title}
                                        </Typography>
                                        <Box sx={{
                                            width: 20,
                                            height: 20,
                                            borderRadius: '6px',
                                            bgcolor: `${col.accent}20`,
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                        }}>
                                            <Typography sx={{
                                                fontFamily: 'var(--font-mono)',
                                                fontSize: '0.65rem',
                                                color: col.accent,
                                                fontWeight: 700,
                                            }}>
                                                {project.tasks?.filter(t => t.status === col.status).length || 0}
                                            </Typography>
                                        </Box>
                                    </Box>
                                    <IconButton
                                        size="small"
                                        onClick={() => { setTaskToEdit(null); setIsTaskModalOpen(true); }}
                                        sx={{
                                            color: col.accent,
                                            width: 28,
                                            height: 28,
                                            borderRadius: '8px',
                                            bgcolor: `${col.accent}14`,
                                            border: `1px solid ${col.accent}30`,
                                            '&:hover': {
                                                bgcolor: `${col.accent}25`,
                                            }
                                        }}
                                    >
                                        <AddIcon sx={{ fontSize: 16 }} />
                                    </IconButton>
                                </Box>

                                {/* Tasks */}
                                <Stack spacing={2} sx={{ flex: 1 }}>
                                    {project.tasks?.filter(t => t.status === col.status).map((task, taskIdx) => {
                                        const prio = priorityMap[task.priority] || priorityMap.Medium;
                                        return (
                                            <Box
                                                key={task.id}
                                                sx={{
                                                    background: 'var(--bg-elevated)',
                                                    border: '1px solid var(--border-subtle)',
                                                    borderRadius: '12px',
                                                    p: 2,
                                                    cursor: 'default',
                                                    transition: 'all 0.2s ease',
                                                    animation: `fadeUp 0.3s ease ${taskIdx * 0.05}s both`,
                                                    '&:hover': {
                                                        border: '1px solid var(--border-default)',
                                                        transform: 'translateY(-1px)',
                                                        boxShadow: '0 4px 16px rgba(0,0,0,0.3)',
                                                    }
                                                }}
                                            >
                                                {/* Priority indicator */}
                                                <Box sx={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'space-between',
                                                    mb: 1.5,
                                                }}>
                                                    <Chip
                                                        label={prio.label}
                                                        size="small"
                                                        sx={{
                                                            fontFamily: 'var(--font-mono)',
                                                            fontSize: '0.65rem',
                                                            height: 20,
                                                            bgcolor: prio.bg,
                                                            color: prio.color,
                                                            border: `1px solid ${prio.border}`,
                                                            '& .MuiChip-label': { px: 1 },
                                                        }}
                                                    />
                                                    <Box>
                                                        <IconButton
                                                            size="small"
                                                            onClick={() => { setTaskToEdit(task); setIsTaskModalOpen(true); }}
                                                            sx={{
                                                                color: 'var(--text-muted)',
                                                                width: 24,
                                                                height: 24,
                                                                '&:hover': { color: 'var(--text-primary)', bgcolor: 'rgba(255,255,255,0.06)' }
                                                            }}
                                                        >
                                                            <EditIcon sx={{ fontSize: 13 }} />
                                                        </IconButton>
                                                        <IconButton
                                                            size="small"
                                                            onClick={() => dispatch(deleteTask({ projectId: id, task }))}
                                                            sx={{
                                                                color: 'var(--text-muted)',
                                                                width: 24,
                                                                height: 24,
                                                                '&:hover': { color: '#ef4444', bgcolor: 'rgba(239,68,68,0.08)' }
                                                            }}
                                                        >
                                                            <DeleteIcon sx={{ fontSize: 13 }} />
                                                        </IconButton>
                                                    </Box>
                                                </Box>

                                                <Typography sx={{
                                                    fontWeight: 700,
                                                    fontSize: '1rem',
                                                    color: 'var(--text-primary)',
                                                    fontFamily: 'var(--font-body)',
                                                    mb: 0.75,
                                                    letterSpacing: '-0.2px',
                                                }}>
                                                    {task.title}
                                                </Typography>

                                                {task.description && (
                                                    <Typography sx={{
                                                        fontSize: '0.875rem',
                                                        color: 'var(--text-secondary)',
                                                        lineHeight: 1.6,
                                                        mb: 1.5,
                                                        display: '-webkit-box',
                                                        WebkitLineClamp: 2,
                                                        WebkitBoxOrient: 'vertical',
                                                        overflow: 'hidden',
                                                    }}>
                                                        {task.description}
                                                    </Typography>
                                                )}

                                                {task.dueDate && (
                                                    <Box sx={{
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        gap: 0.75,
                                                        mt: 1,
                                                    }}>
                                                        <CalendarMonthIcon sx={{ fontSize: 12, color: 'var(--text-muted)' }} />
                                                        <Typography sx={{
                                                            fontFamily: 'var(--font-mono)',
                                                            fontSize: '0.7rem',
                                                            color: 'var(--text-muted)',
                                                        }}>
                                                            {task.dueDate}
                                                        </Typography>
                                                    </Box>
                                                )}
                                            </Box>
                                        );
                                    })}
                                </Stack>
                            </Box>
                        </Grid>
                    ))}
                </Grid>
            </Box>

            <TaskItem
                open={isTaskModalOpen}
                onClose={() => setIsTaskModalOpen(false)}
                taskToEdit={taskToEdit}
            />

            {/* Delete Confirmation Dialog */}
            <Dialog
                open={deleteDialogOpen}
                onClose={() => setDeleteDialogOpen(false)}
                PaperProps={{
                    sx: {
                        bgcolor: 'var(--bg-surface)',
                        backgroundImage: 'none',
                        border: '1px solid rgba(239,68,68,0.3)',
                        borderRadius: '20px',
                        boxShadow: '0 8px 48px rgba(0,0,0,0.6)',
                        maxWidth: 420,
                        width: '100%',
                        p: 1,
                    }
                }}
            >
                <DialogTitle sx={{ textAlign: 'center', pt: 4, pb: 1 }}>
                    <Box sx={{
                        width: 60,
                        height: 60,
                        borderRadius: '16px',
                        bgcolor: 'rgba(239,68,68,0.1)',
                        border: '1px solid rgba(239,68,68,0.3)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        mx: 'auto',
                        mb: 2,
                    }}>
                        <WarningAmberIcon sx={{ color: '#ef4444', fontSize: 30 }} />
                    </Box>
                    <Typography sx={{
                        fontWeight: 800,
                        fontSize: '1.3rem',
                        color: 'var(--text-primary)',
                        fontFamily: 'var(--font-body)',
                        letterSpacing: '-0.5px',
                    }}>
                        מחיקת פרויקט
                    </Typography>
                </DialogTitle>
                <DialogContent sx={{ textAlign: 'center', pb: 1 }}>
                    <Typography sx={{
                        color: 'var(--text-secondary)',
                        fontSize: '0.95rem',
                        lineHeight: 1.7,
                    }}>
                        האם אתה בטוח שברצונך למחוק את הפרויקט
                        <Box component="span" sx={{ color: 'var(--text-primary)', fontWeight: 700, mx: 0.5 }}>
                            "{project.name}"
                        </Box>
                        ? פעולה זו אינה ניתנת לביטול.
                    </Typography>
                </DialogContent>
                <DialogActions sx={{ p: 3, gap: 1.5, flexDirection: 'row-reverse' }}>
                    <Button
                        fullWidth
                        onClick={() => setDeleteDialogOpen(false)}
                        sx={{
                            fontFamily: 'var(--font-body)',
                            fontWeight: 600,
                            py: 1.3,
                            borderRadius: '10px',
                            color: 'var(--text-secondary)',
                            bgcolor: 'transparent',
                            border: '1px solid var(--border-default)',
                            textTransform: 'none',
                            '&:hover': { bgcolor: 'rgba(255,255,255,0.04)', color: 'var(--text-primary)' }
                        }}
                    >
                        ביטול
                    </Button>
                    <Button
                        fullWidth
                        onClick={() => {
                            dispatch(deleteProject(project.id));
                            navigate('/projects');
                        }}
                        sx={{
                            fontFamily: 'var(--font-body)',
                            fontWeight: 700,
                            py: 1.3,
                            borderRadius: '10px',
                            bgcolor: '#ef4444',
                            color: '#fff',
                            textTransform: 'none',
                            border: 'none',
                            boxShadow: '0 4px 16px rgba(239,68,68,0.35)',
                            '&:hover': {
                                bgcolor: '#dc2626',
                                boxShadow: '0 6px 24px rgba(239,68,68,0.5)',
                            }
                        }}
                    >
                        כן, מחק פרויקט
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}
