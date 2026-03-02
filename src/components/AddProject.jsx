import * as React from 'react';
import { useForm } from 'react-hook-form';
import { Button, Dialog, AppBar, Toolbar, IconButton, Typography, Slide, TextField, Stack, Box } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
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
    const currentUser = useSelector(state => state.user.currentUser);

    // תיקון השגיאה: בודק אם הדיאלוג פתוח דרך פרופס או כי אנחנו בנתיב הניווט
    const isOpen = propOpen || location.pathname === '/AddProject';

    // שליפת הפרויקט מה-state של הניווט
    const projectToEdit = location.state?.projectToEdit;

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
            navigate('/projects'); // חוזר לרשימה אם הגענו דרך ניווט
        }
    };

    const onSubmit = (data) => {
        if (projectToEdit) {
            const updatedProject = {
                ...projectToEdit,
                name: data.name,
                description: data.description,
            };
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
            dispatch(setProject(newProject));
            if (onAddProject) onAddProject(newProject);
        }

        reset();
        handleInternalClose();
    };

    return (
        <Dialog 
            fullScreen 
            open={isOpen} // משתמשים במשתנה המחושב
            onClose={handleInternalClose} 
        >
            <AppBar sx={{ position: 'relative', backgroundColor: '#1976d2' }}>
                <Toolbar>
                    <IconButton edge="start" color="inherit" onClick={handleInternalClose} aria-label="close">
                        <CloseIcon />
                    </IconButton>
                    <Typography sx={{ ml: 2, flex: 1 }} variant="h6">
                        {projectToEdit ? "עריכת פרויקט" : "יצירת פרויקט חדש"}
                    </Typography>
                    <Button color="inherit" onClick={handleSubmit(onSubmit)}>
                        {projectToEdit ? "שמור שינויים" : "שמור פרויקט"}
                    </Button>
                </Toolbar>
            </AppBar>

            <Box sx={{ p: 4, maxWidth: 600, mx: 'auto', mt: 4 }}>
                <Typography variant="h5" gutterBottom>
                    {projectToEdit ? "עדכון פרטי הפרויקט" : "פרטי הפרויקט"}
                </Typography>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Stack spacing={3}>
                        <TextField
                            label="שם הפרויקט"
                            fullWidth
                            {...register("name", { required: "חובה להזין שם פרויקט" })}
                            error={!!errors.name}
                            helperText={errors.name?.message}
                        />
                        <TextField
                            label="תיאור הפרויקט"
                            fullWidth
                            multiline
                            rows={4}
                            {...register("description", { required: "חובה להזין תיאור" })}
                            error={!!errors.description}
                            helperText={errors.description?.message}
                        />
                    </Stack>
                </form>
            </Box>
        </Dialog>
    );
}