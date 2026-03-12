import * as React from 'react';
import { useForm } from 'react-hook-form';
import { Button, Dialog, AppBar, Toolbar, IconButton, Typography, Slide, TextField, Stack, Box } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import SaveIcon from '@mui/icons-material/Save';
import { setProject, updateProject } from '../Store/projectSlice';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function AddProject({ open: propOpen, onClose, onAddProject }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const currentUser = useSelector(state => state.user.currentUser);//שליפת המשמש שמחובר כרגע

    //פתיחת החלון  או לא 
    const isOpen = propOpen || location.pathname === '/AddProject';
    //משתנה יכיל את האובייקט אם הגיע בגלל עדכון
    const projectToEdit = location.state?.projectToEdit;

    //דואגת למילוי תקין של הטופס
    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        values: projectToEdit ? {
            name: projectToEdit.name,
            description: projectToEdit.description
        } : { name: '', description: '' }
    });

    const handleInternalClose = () => {
        if (onClose) {
            onClose();
        } else {
            navigate('/projects');
        }
    };

    //פונקציה שבודקת מדוע הגענו לעמוד זה בגלל עדכון פרויקט או בגלל פתיחת פרויקט ופועלת על פי זה 
    const onSubmit = (data) => {
        if (projectToEdit) {
            //שומר על נתוני הפרויקט המקורי עד לשינוי
            const updatedProject = {
                ...projectToEdit,
                name: data.name,
                description: data.description,
            };
            //אם זה עדכון פרויקט
            dispatch(updateProject(updatedProject));
        } else {
            const newProject = {
                userId: currentUser?.id,
                id: new Date().getTime(),
                name: data.name,
                description: data.description,
                createdAt: new Date().toLocaleDateString(),
                tasks: [],
            };
            //אם זה יצירת פרויקט חדש יצירת אובייקט חדש
            dispatch(setProject(newProject));
            if (onAddProject) onAddProject(newProject);
        }
        reset();
        handleInternalClose();
    };

    const inputSx = {
        '& .MuiOutlinedInput-root': {
            backgroundColor: 'rgba(255,255,255,0.03)',
            borderRadius: '12px',
            fontFamily: 'var(--font-body)',
            color: 'var(--text-primary)',
            transition: 'all 0.25s ease',
            '& fieldset': {
                borderColor: 'var(--border-default)',
                transition: 'all 0.25s ease',
            },
            '&:hover fieldset': {
                borderColor: 'rgba(0,229,195,0.4)',
            },
            '&.Mui-focused fieldset': {
                borderColor: 'var(--accent-primary)',
                borderWidth: '1px',
                boxShadow: '0 0 0 3px rgba(0,229,195,0.1)',
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
        '& .MuiFormHelperText-root': {
            color: '#ef4444',
            fontFamily: 'var(--font-body)',
            marginTop: '6px',
        },
    };

    return (
        <Dialog
            fullScreen
            open={isOpen}
            onClose={handleInternalClose}
            TransitionComponent={Transition}
            PaperProps={{
                sx: {
                    bgcolor: 'var(--bg-base)',
                    backgroundImage: 'none',
                }
            }}
        >
            {/* AppBar */}
            <AppBar sx={{
                position: 'relative',
                background: 'rgba(13,17,23,0.95)',
                backdropFilter: 'blur(20px)',
                borderBottom: '1px solid var(--border-subtle)',
                boxShadow: 'none',
            }}>
                <Toolbar sx={{ px: { xs: 2, md: 4 } }}>
                    <IconButton
                        edge="start"
                        onClick={handleInternalClose}
                        sx={{
                            color: 'var(--text-secondary)',
                            borderRadius: '10px',
                            '&:hover': {
                                bgcolor: 'rgba(255,255,255,0.06)',
                                color: 'var(--text-primary)',
                            }
                        }}
                    >
                        <CloseIcon />
                    </IconButton>

                    <Box sx={{ display: 'flex', alignItems: 'center', ml: 2, flex: 1, gap: 2 }}>
                        <Box sx={{
                            width: 8,
                            height: 8,
                            borderRadius: '50%',
                            bgcolor: 'var(--accent-primary)',
                        }} />
                        <Typography sx={{
                            fontFamily: 'var(--font-body)',
                            fontWeight: 700,
                            fontSize: '1rem',
                            color: 'var(--text-primary)',
                            letterSpacing: '-0.3px',
                        }}>
                            {projectToEdit ? "עריכת פרויקט" : "פרויקט חדש"}
                        </Typography>
                    </Box>

                    <Button
                        startIcon={<SaveIcon sx={{ fontSize: '18px !important' }} />}
                        onClick={handleSubmit(onSubmit)}
                        sx={{
                            fontFamily: 'var(--font-body)',
                            fontWeight: 700,
                            fontSize: '0.9rem',
                            px: 3,
                            py: 1,
                            borderRadius: '10px',
                            background: 'linear-gradient(135deg, #00e5c3 0%, #7c6af7 100%)',
                            color: '#0d1117',
                            textTransform: 'none',
                            border: 'none',
                            '& .MuiButton-startIcon': { marginLeft: 1, marginRight: -0.5 },
                            '&:hover': {
                                background: 'linear-gradient(135deg, #00f5d3 0%, #8c7aff 100%)',
                                boxShadow: '0 4px 16px rgba(0,229,195,0.35)',
                            }
                        }}
                    >
                        {projectToEdit ? "שמור שינויים" : "שמור"}
                    </Button>
                </Toolbar>
            </AppBar>

            {/* Content */}
            <Box sx={{
                flex: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                p: 3,
                position: 'relative',
            }}>
                {/* Background grid */}
                <Box sx={{
                    position: 'absolute',
                    inset: 0,
                    backgroundImage: `
                        linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px)
                    `,
                    backgroundSize: '48px 48px',
                    pointerEvents: 'none',
                }} />

                <Box sx={{
                    position: 'relative',
                    width: '100%',
                    maxWidth: 560,
                    animation: 'fadeUp 0.4s ease forwards',
                }}>
                    {/* Panel */}
                    <Box sx={{
                        background: 'var(--bg-surface)',
                        border: '1px solid var(--border-default)',
                        borderRadius: '20px',
                        p: { xs: 3, md: 5 },
                        boxShadow: 'var(--shadow-lg)',
                    }}>
                        {/* Header */}
                        <Box sx={{ mb: 4 }}>
                            <Typography sx={{
                                fontFamily: 'var(--font-mono)',
                                fontSize: '0.72rem',
                                color: 'var(--accent-primary)',
                                letterSpacing: '0.1em',
                                textTransform: 'uppercase',
                                mb: 1,
                            }}>
                                {projectToEdit ? 'עריכה' : 'יצירה'}
                            </Typography>
                            <Typography variant="h5" sx={{
                                fontWeight: 700,
                                color: 'var(--text-primary)',
                                fontFamily: 'var(--font-body)',
                                letterSpacing: '-0.5px',
                            }}>
                                {projectToEdit ? "עדכון פרטי הפרויקט" : "פרטי הפרויקט"}
                            </Typography>
                        </Box>

                        <form onSubmit={handleSubmit(onSubmit)}>
                            <Stack spacing={3}>
                                <TextField
                                    label="שם הפרויקט"
                                    fullWidth
                                    {...register("name", { required: "חובה להזין שם פרויקט" })}
                                    error={!!errors.name}
                                    helperText={errors.name?.message}
                                    sx={inputSx}
                                />
                                <TextField
                                    label="תיאור הפרויקט"
                                    fullWidth
                                    multiline
                                    rows={5}
                                    {...register("description", { required: "חובה להזין תיאור" })}
                                    error={!!errors.description}
                                    helperText={errors.description?.message}
                                    sx={inputSx}
                                />
                            </Stack>
                        </form>
                    </Box>
                </Box>
            </Box>
        </Dialog>
    );
}
