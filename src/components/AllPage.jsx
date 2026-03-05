import React, { useState } from 'react';
import { Container, Typography, Button, Grid, Box, Chip } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import AddProject from './AddProject';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export default function AllPage() {
    const allProjects = useSelector(state => state.project.allProjects);
    const currentUser = useSelector(state => state.user.currentUser);
    const navigateToItemProject = useNavigate();
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const userProjects = allProjects.filter(p => p.userId === currentUser?.id);

    const moveToItem = (id) => {
        navigateToItemProject(`/project/${id}`);
    };

    const handleAddProject = () => {
        setIsDialogOpen(false);
    };

    return (
        <Box sx={{
            minHeight: '100vh',
            bgcolor: 'var(--bg-base)',
            pt: 4,
            pb: 8,
        }}>
            <Container maxWidth="xl">
                {/* Header */}
                <Box sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    mb: 6,
                    animation: 'fadeUp 0.4s ease forwards',
                }}>
                    <Box>
                        <Typography sx={{
                            fontFamily: 'var(--font-mono)',
                            fontSize: '0.75rem',
                            color: 'var(--accent-primary)',
                            letterSpacing: '0.1em',
                            textTransform: 'uppercase',
                            mb: 1,
                        }}>
                            Dashboard
                        </Typography>
                        <Typography variant="h3" sx={{
                            fontWeight: 700,
                            color: 'var(--text-primary)',
                            fontFamily: 'var(--font-body)',
                            letterSpacing: '-1.5px',
                            lineHeight: 1.1,
                        }}>
                            הפרויקטים שלי
                        </Typography>
                        <Typography sx={{
                            color: 'var(--text-secondary)',
                            mt: 1,
                            fontSize: '0.95rem',
                        }}>
                            {userProjects.length > 0
                                ? `${userProjects.length} פרויקט${userProjects.length !== 1 ? 'ים' : ''} פעיל${userProjects.length !== 1 ? 'ים' : ''}`
                                : 'עדיין אין פרויקטים'}
                        </Typography>
                    </Box>

                    <Button
                        variant="contained"
                        startIcon={<AddIcon />}
                        onClick={() => setIsDialogOpen(true)}
                        sx={{
                            fontFamily: 'var(--font-body)',
                            fontWeight: 600,
                            fontSize: '0.95rem',
                            px: 3,
                            py: 1.5,
                            borderRadius: '12px',
                            background: 'linear-gradient(135deg, #00e5c3 0%, #7c6af7 100%)',
                            color: '#0d1117',
                            textTransform: 'none',
                            boxShadow: '0 4px 20px rgba(0, 229, 195, 0.25)',
                            border: 'none',
                            transition: 'all 0.3s ease',
                            '& .MuiButton-startIcon': { marginLeft: 1, marginRight: -0.5 },
                            '&:hover': {
                                background: 'linear-gradient(135deg, #00f5d3 0%, #8c7aff 100%)',
                                transform: 'translateY(-2px)',
                                boxShadow: '0 8px 30px rgba(0, 229, 195, 0.4)',
                            }
                        }}
                    >
                        פרויקט חדש
                    </Button>
                </Box>

                {/* Divider */}
                <Box sx={{
                    height: '1px',
                    background: 'linear-gradient(90deg, var(--accent-primary) 0%, var(--accent-secondary) 50%, transparent 100%)',
                    mb: 5,
                    opacity: 0.4,
                }} />

                {/* Projects Grid */}
                {userProjects.length > 0 ? (
                    <Grid container spacing={3}>
                        {userProjects.map((project, index) => (
                            <Grid item xs={12} sm={6} md={4} lg={3} key={project.id}>
                                <Box
                                    sx={{
                                        background: 'var(--bg-surface)',
                                        border: '1px solid var(--border-subtle)',
                                        borderRadius: '16px',
                                        p: 3,
                                        height: '100%',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        cursor: 'pointer',
                                        position: 'relative',
                                        overflow: 'hidden',
                                        transition: 'all 0.3s ease',
                                        animation: `fadeUp 0.4s ease ${index * 0.07}s both`,
                                        '&::before': {
                                            content: '""',
                                            position: 'absolute',
                                            top: 0,
                                            left: 0,
                                            right: 0,
                                            height: '2px',
                                            background: 'linear-gradient(90deg, #00e5c3, #7c6af7)',
                                            opacity: 0,
                                            transition: 'opacity 0.3s ease',
                                        },
                                        '&:hover': {
                                            transform: 'translateY(-4px)',
                                            border: '1px solid rgba(0,229,195,0.3)',
                                            boxShadow: '0 8px 40px rgba(0,0,0,0.4), 0 0 20px rgba(0,229,195,0.08)',
                                            '&::before': { opacity: 1 },
                                        }
                                    }}
                                >
                                    {/* Icon */}
                                    <Box sx={{
                                        width: 44,
                                        height: 44,
                                        borderRadius: '10px',
                                        background: 'rgba(0,229,195,0.1)',
                                        border: '1px solid rgba(0,229,195,0.2)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        mb: 2.5,
                                    }}>
                                        <FolderOpenIcon sx={{ color: 'var(--accent-primary)', fontSize: 22 }} />
                                    </Box>

                                    {/* Title */}
                                    <Typography sx={{
                                        fontWeight: 700,
                                        fontSize: '1.05rem',
                                        color: 'var(--text-primary)',
                                        letterSpacing: '-0.3px',
                                        mb: 1,
                                        lineHeight: 1.3,
                                    }}>
                                        {project.name}
                                    </Typography>

                                    {/* Date */}
                                    <Typography sx={{
                                        fontFamily: 'var(--font-mono)',
                                        fontSize: '0.72rem',
                                        color: 'var(--text-muted)',
                                        mb: 2,
                                        letterSpacing: '0.03em',
                                    }}>
                                        נוצר: {project.createdAt}
                                    </Typography>

                                    {/* Description */}
                                    <Typography sx={{
                                        color: 'var(--text-secondary)',
                                        fontSize: '0.875rem',
                                        lineHeight: 1.7,
                                        flex: 1,
                                        mb: 3,
                                        display: '-webkit-box',
                                        WebkitLineClamp: 3,
                                        WebkitBoxOrient: 'vertical',
                                        overflow: 'hidden',
                                    }}>
                                        {project.description || 'אין תיאור'}
                                    </Typography>

                                    {/* Task count chip */}
                                    {project.tasks?.length > 0 && (
                                        <Box sx={{ mb: 2 }}>
                                            <Chip
                                                label={`${project.tasks.length} משימות`}
                                                size="small"
                                                sx={{
                                                    fontFamily: 'var(--font-mono)',
                                                    fontSize: '0.7rem',
                                                    bgcolor: 'rgba(124,106,247,0.12)',
                                                    color: '#a79cf7',
                                                    border: '1px solid rgba(124,106,247,0.25)',
                                                    height: 24,
                                                }}
                                            />
                                        </Box>
                                    )}

                                    {/* CTA */}
                                    <Button
                                        fullWidth
                                        endIcon={<ArrowForwardIcon sx={{ fontSize: '16px !important', ml: 0.5 }} />}
                                        onClick={() => moveToItem(project.id)}
                                        sx={{
                                            fontFamily: 'var(--font-body)',
                                            fontWeight: 600,
                                            fontSize: '0.875rem',
                                            py: 1.2,
                                            borderRadius: '10px',
                                            background: 'rgba(0,229,195,0.08)',
                                            color: 'var(--accent-primary)',
                                            textTransform: 'none',
                                            border: '1px solid rgba(0,229,195,0.2)',
                                            justifyContent: 'space-between',
                                            px: 2,
                                            '& .MuiButton-endIcon': { marginLeft: 'auto', marginRight: 0 },
                                            transition: 'all 0.2s ease',
                                            '&:hover': {
                                                background: 'rgba(0,229,195,0.15)',
                                                border: '1px solid rgba(0,229,195,0.4)',
                                            }
                                        }}
                                    >
                                        פתח פרויקט
                                    </Button>
                                </Box>
                            </Grid>
                        ))}
                    </Grid>
                ) : (
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        py: 12,
                        animation: 'fadeIn 0.5s ease forwards',
                    }}>
                        <Box sx={{
                            width: 80,
                            height: 80,
                            borderRadius: '20px',
                            background: 'rgba(0,229,195,0.06)',
                            border: '1px solid rgba(0,229,195,0.15)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            mb: 3,
                        }}>
                            <FolderOpenIcon sx={{ color: 'var(--text-muted)', fontSize: 36 }} />
                        </Box>
                        <Typography sx={{
                            color: 'var(--text-secondary)',
                            fontSize: '1.1rem',
                            fontWeight: 600,
                            mb: 1,
                        }}>
                            אין פרויקטים עדיין
                        </Typography>
                        <Typography sx={{
                            color: 'var(--text-muted)',
                            fontSize: '0.9rem',
                            mb: 4,
                        }}>
                            צור את הפרויקט הראשון שלך כדי להתחיל
                        </Typography>
                        <Button
                            startIcon={<AddIcon />}
                            onClick={() => setIsDialogOpen(true)}
                            sx={{
                                fontFamily: 'var(--font-body)',
                                fontWeight: 600,
                                px: 3,
                                py: 1.4,
                                borderRadius: '12px',
                                background: 'linear-gradient(135deg, #00e5c3 0%, #7c6af7 100%)',
                                color: '#0d1117',
                                textTransform: 'none',
                                border: 'none',
                                '& .MuiButton-startIcon': { marginLeft: 1, marginRight: -0.5 },
                                '&:hover': {
                                    background: 'linear-gradient(135deg, #00f5d3 0%, #8c7aff 100%)',
                                    transform: 'translateY(-2px)',
                                    boxShadow: '0 8px 24px rgba(0,229,195,0.35)',
                                }
                            }}
                        >
                            צור פרויקט ראשון
                        </Button>
                    </Box>
                )}
            </Container>

            <AddProject
                open={isDialogOpen}
                onClose={() => setIsDialogOpen(false)}
                onAddProject={handleAddProject}
            />
        </Box>
    );
}
