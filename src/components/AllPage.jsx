import React, { useState } from 'react';
import { Container, Paper, Typography, Button, Grid, Card, CardContent, Divider, Box } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import AddProject from './AddProject';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export default function AllPage() {
    const allProjects = useSelector(state => state.project.allProjects);
    const currentUser = useSelector(state => state.user.currentUser);
    const navigateToItemProject = useNavigate();

    const [isDialogOpen, setIsDialogOpen] = useState(false);
    // סינון: רק פרויקטים שה-userId שלהם תואם למשתמש המחובר
    const userProjects = allProjects.filter(p => p.userId === currentUser?.id);
    const moveToItem = (id) => {
        navigateToItemProject(`/project/${id}`)
    };
    const handleAddProject = () => {
        setIsDialogOpen(false);
    };

    return (
        <Container maxWidth="lg" sx={{ mt: 4 }}>
            {/* כותרת וכפתור הוספה */}
            <Paper elevation={2} sx={{ p: 3, mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderRadius: 2 }}>
                <Typography variant="h4" fontWeight="bold" color="primary">הפרויקטים שלי</Typography>
                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={() => setIsDialogOpen(true)}
                >
                    הוספת פרויקט
                </Button>
            </Paper>

            {/* רשימת הכרטיסיות */}
            <Grid container spacing={3}>
                {userProjects.length > 0 ? (
                    userProjects.map((project) => (
                        <Grid item xs={12} sm={6} md={4} key={project.id}>
                            <Card elevation={3} sx={{ borderRadius: 2, transition: '0.3s', '&:hover': { transform: 'translateY(-5px)' } }}>
                                <CardContent>
                                    <Typography variant="h6" gutterBottom>{project.name}</Typography>
                                    <Typography variant="caption" color="text.secondary">
                                        נוצר בתאריך: {project.createdAt}
                                    </Typography>
                                    <Divider sx={{ my: 1.5 }} />
                                    <Typography variant="body2" color="text.secondary" sx={{ minHeight: 40 }}>
                                        {project.description}
                                    </Typography>
                                    <Button
                                        fullWidth
                                        variant="contained"
                                        color="primary"
                                        size="medium"
                                        onClick={() => moveToItem(project.id)} // תיקון: שליחת ה-ID ועטיפה ב-Arrow Function
                                        sx={{
                                            borderRadius: 1.5,
                                            textTransform: 'none',
                                            fontWeight: 'bold',
                                            boxShadow: 'none',
                                            '&:hover': {
                                                boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
                                                backgroundColor: 'primary.dark',
                                            }
                                        }}
                                    >
                                        צפייה בפרטים
                                    </Button>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))
                ) : (
                    <Box sx={{ width: '100%', textAlign: 'center', py: 10 }}>
                        <Typography variant="h6" color="text.disabled">
                            אין פרויקטים. לחץ על הכפתור למעלה כדי ליצור את הפרויקט הראשון שלך!
                        </Typography>
                    </Box>
                )}
            </Grid>

            {/* הקומפוננטה של הדיאלוג */}
            <AddProject
                open={isDialogOpen}
                onClose={() => setIsDialogOpen(false)}
                onAddProject={handleAddProject}
            />
        </Container>
    );
}