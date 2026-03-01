import * as React from 'react';
import { useForm } from 'react-hook-form';
import { Button, Dialog, AppBar, Toolbar, IconButton, Typography, Slide, TextField, Stack, Box } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { setProject } from '../Store/projectSlice';
import { useSelector, useDispatch } from 'react-redux';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function AddProject({ open, onClose, onAddProject }) {
    const currentUser = useSelector(state => state.user.currentUser);
    // הגדרת react-hook-form
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const dispatch = useDispatch();

    const onSubmit = (data) => {
        // יצירת אובייקט פרויקט חדש לפי הדרישות
        const newProject = {
            userId: currentUser.id,
            id: new Date().getTime(),
            name: data.name,
            description: data.description,
            createdAt: new Date().toLocaleDateString(),
            tasks: [] ,// מערך משימות ריק להתחלה
        };
        
        dispatch(setProject(newProject));

        console.log("פרויקט חדש נוצר:", newProject);
        
        // שליחת הנתונים חזרה לאבא (AllPage) כדי להציג על המסך
        onAddProject(newProject); 
        
        reset(); // איפוס השדות
        onClose(); // סגירת החלון
    };

    return (
        <Dialog fullScreen open={open} onClose={onClose} TransitionComponent={Transition}>
            <AppBar sx={{ position: 'relative', backgroundColor: '#1976d2' }}>
                <Toolbar>
                    <IconButton edge="start" color="inherit" onClick={onClose} aria-label="close">
                        <CloseIcon />
                    </IconButton>
                    <Typography sx={{ ml: 2, flex: 1 }} variant="h6">
                        יצירת פרויקט חדש
                    </Typography>
                    <Button color="inherit" onClick={handleSubmit(onSubmit)}>
                        שמור פרויקט
                    </Button>
                </Toolbar>
            </AppBar>

            <Box sx={{ p: 4, maxWidth: 600, mx: 'auto', mt: 4 }}>
                <Typography variant="h5" gutterBottom>פרטי הפרויקט</Typography>
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