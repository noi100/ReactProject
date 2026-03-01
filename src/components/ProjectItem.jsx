import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { 
    Grid, Typography, Paper, Box, Button, 
    Card, CardContent, Chip, IconButton, Stack, Divider 
} from '@mui/material'; // חזרנו לייבוא רגיל ופשוט
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { deleteProject } from '../Store/projectSlice';


export default function ProjectItem() {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // הלוגיקה הקיימת שלך לשליפת הפרויקט
    const project = useSelector(state =>
        state.project.allProjects.find(p => p.id === Number(id))
    );

//פונקציית המחיקה
    const handleDelete = () => {
        if (window.confirm(`האם את בטוחה שברצונך למחוק את הפרויקט "${project?.name}"?`)) {
            dispatch(deleteProject(Number(id)));            
            // מעבירים את המשתמש חזרה לרשימת הפרויקטים
            navigate('/projects'); 
        }
    };

    if (!project) return <Typography variant="h5" sx={{ p: 5, textAlign: 'center' }}>הפרויקט לא נמצא</Typography>;

    // 4 העמודות לפי הדרישות שלך
    const columns = [
        { title: "משימות לביצוע", status: "ToDo", color: "#ebf0f5" },
        { title: "בביצוע מפתח", status: "InProgress", color: "#fff9db" },
        { title: "מוכן לבדיקה", status: "Testing", color: "#e3f2fd" },
        { title: "בוצע ונבדק", status: "Done", color: "#e8f5e9" }
    ];

    return (
        <Box sx={{ p: { xs: 2, md: 4 }, bgcolor: '#fafafa', minHeight: '100vh' }}>

            {/* כותרת הפרויקט וכפתורי ניהול פרויקט */}
            <Paper elevation={0} sx={{ p: 3, mb: 4, borderRadius: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center', border: '1px solid #eee' }}>
                <Box>
                    <Typography variant="h4" fontWeight="800" color="primary.main">{project?.name}</Typography>
                    <Typography variant="body1" color="text.secondary">{project?.description}</Typography>
                </Box>
                <Stack direction="row" spacing={1}>
                    <Button startIcon={<EditIcon />} variant="outlined" color="primary" size="small">ערוך פרויקט</Button>
                    <Button onClick={handleDelete} startIcon={<DeleteIcon />} variant="outlined" color="error" size="small">מחק פרויקט</Button>
                </Stack>
            </Paper>

            {/* לוח המשימות - 4 עמודות */}
            <Grid container spacing={3}>
                {columns.map((col) => (
                    <Grid item xs={12} sm={6} md={3} key={col.status}>
                        <Paper
                            elevation={0}
                            sx={{
                                p: 2,
                                bgcolor: col.color,
                                borderRadius: 2,
                                minHeight: '70vh',
                                border: '1px solid rgba(0,0,0,0.05)'
                            }}
                        >
                            {/* כותרת עמודה + כפתור הוספת משימה */}
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                                <Typography variant="subtitle1" fontWeight="bold">
                                    {col.title}
                                </Typography>
                                <IconButton size="small" color="primary" sx={{ bgcolor: 'white', '&:hover': { bgcolor: '#eee' } }}>
                                    <AddIcon fontSize="small" />
                                </IconButton>
                            </Box>

                            <Divider sx={{ mb: 2 }} />

                            {/* כאן ירוץ ה-Map של המשימות בעתיד. בינתיים נשים כרטיסייה לדוגמה בשביל העיצוב */}
                            <Stack spacing={2}>
                                <Card elevation={1} sx={{ borderRadius: 2, borderLeft: '5px solid #1976d2' }}>
                                    <CardContent sx={{ p: 1.5, '&:last-child': { pb: 1.5 } }}>
                                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                                            <Chip label="High" size="small" color="error" variant="outlined" sx={{ height: 20, fontSize: '10px' }} />
                                            <Box>
                                                <IconButton size="small" sx={{ p: 0.5 }}><EditIcon sx={{ fontSize: 16 }} /></IconButton>
                                                <IconButton size="small" sx={{ p: 0.5 }}><DeleteIcon sx={{ fontSize: 16 }} /></IconButton>
                                            </Box>
                                        </Box>
                                        <Typography variant="subtitle2" fontWeight="bold">כותרת משימה לדוגמה</Typography>
                                        <Typography variant="caption" color="text.secondary" display="block" sx={{ mt: 0.5 }}>
                                            תיאור קצר של המשימה כפי שיופיע בלוח...
                                        </Typography>
                                        <Box sx={{ mt: 1.5, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <Typography variant="caption" fontWeight="500">תאריך יעד: 12/12/25</Typography>
                                        </Box>
                                    </CardContent>
                                </Card>
                            </Stack>

                        </Paper>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
}