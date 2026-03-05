import React from 'react';
import { useForm } from 'react-hook-form';
import { TextField, Button, Box, Typography, InputAdornment } from '@mui/material';
import { useDispatch } from 'react-redux';
import { setLogin } from '../Store/userSlice';
import { Link, useNavigate } from 'react-router-dom';

export default function Login() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onSubmit = (data) => {
        const userWithId = {
            ...data,
            id: data.password
        };
        dispatch(setLogin(userWithId));
        navigate('/AllProject');
    };

    const inputSx = {
        '& .MuiFilledInput-root': {
            backgroundColor: 'rgba(255,255,255,0.04)',
            borderRadius: '10px',
            border: '1px solid rgba(255,255,255,0.08)',
            transition: 'all 0.25s ease',
            fontFamily: 'var(--font-body)',
            '&:hover': {
                backgroundColor: 'rgba(255,255,255,0.07)',
                border: '1px solid rgba(0,229,195,0.3)',
            },
            '&.Mui-focused': {
                backgroundColor: 'rgba(0,229,195,0.05)',
                border: '1px solid rgba(0,229,195,0.6)',
                boxShadow: '0 0 0 3px rgba(0,229,195,0.1)',
            },
            '&:before, &:after': { display: 'none' },
        },
        '& .MuiInputLabel-root': {
            color: 'var(--text-secondary)',
            fontFamily: 'var(--font-body)',
            '&.Mui-focused': { color: 'var(--accent-primary)' },
        },
        '& .MuiFilledInput-input': {
            color: 'var(--text-primary)',
            fontFamily: 'var(--font-body)',
            padding: '18px 16px 10px',
        },
        '& .MuiFormHelperText-root': {
            color: '#ef4444',
            fontFamily: 'var(--font-body)',
        },
    };

    return (
        <Box sx={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            px: 2,
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
                maxWidth: 440,
                animation: 'fadeUp 0.5s ease forwards',
            }}>
                {/* Card */}
                <Box sx={{
                    background: 'var(--bg-surface)',
                    border: '1px solid var(--border-default)',
                    borderRadius: '20px',
                    p: { xs: 3, md: 5 },
                    boxShadow: 'var(--shadow-lg)',
                    backdropFilter: 'blur(20px)',
                }}>
                    {/* Logo mark */}
                    <Box sx={{ textAlign: 'center', mb: 4 }}>
                        <Box sx={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: 52,
                            height: 52,
                            borderRadius: '14px',
                            background: 'linear-gradient(135deg, rgba(0,229,195,0.2) 0%, rgba(124,106,247,0.2) 100%)',
                            border: '1px solid rgba(0,229,195,0.3)',
                            mb: 2,
                        }}>
                            <Typography sx={{
                                fontFamily: 'var(--font-mono)',
                                fontSize: '1.4rem',
                                background: 'linear-gradient(135deg, #00e5c3 0%, #7c6af7 100%)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                backgroundClip: 'text',
                            }}>P</Typography>
                        </Box>
                        <Typography variant="h5" sx={{
                            fontWeight: 700,
                            color: 'var(--text-primary)',
                            fontFamily: 'var(--font-body)',
                            letterSpacing: '-0.5px',
                            mb: 0.5,
                        }}>
                            ברוך הבא
                        </Typography>
                        <Typography sx={{
                            color: 'var(--text-secondary)',
                            fontSize: '0.9rem',
                        }}>
                            התחבר כדי לנהל את הפרויקטים שלך
                        </Typography>
                    </Box>

                    {/* Form */}
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
                            <TextField
                                fullWidth
                                label="שם משתמש"
                                variant="filled"
                                {...register("userName", { required: "חובה להזין שם משתמש", maxLength: 20 })}
                                error={!!errors.userName}
                                helperText={errors.userName?.message}
                                sx={inputSx}
                            />
                            <TextField
                                fullWidth
                                label="מייל"
                                variant="filled"
                                {...register("email", {
                                    pattern: {
                                        value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                                        message: "כתובת מייל לא תקינה"
                                    }
                                })}
                                error={!!errors.email}
                                helperText={errors.email?.message}
                                sx={inputSx}
                            />
                            <TextField
                                fullWidth
                                label="סיסמא"
                                variant="filled"
                                type="password"
                                {...register("password", {
                                    minLength: { value: 6, message: "הסיסמה חייבת להכיל לפחות 6 תווים" }
                                })}
                                error={!!errors.password}
                                helperText={errors.password?.message}
                                sx={inputSx}
                            />

                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{
                                    mt: 1,
                                    py: 1.6,
                                    fontFamily: 'var(--font-body)',
                                    fontWeight: 700,
                                    fontSize: '1rem',
                                    borderRadius: '12px',
                                    background: 'linear-gradient(135deg, #00e5c3 0%, #7c6af7 100%)',
                                    color: '#0d1117',
                                    textTransform: 'none',
                                    boxShadow: '0 4px 20px rgba(0, 229, 195, 0.3)',
                                    border: 'none',
                                    letterSpacing: '0.3px',
                                    transition: 'all 0.3s ease',
                                    '&:hover': {
                                        background: 'linear-gradient(135deg, #00f5d3 0%, #8c7aff 100%)',
                                        transform: 'translateY(-2px)',
                                        boxShadow: '0 8px 30px rgba(0, 229, 195, 0.45)',
                                    }
                                }}
                            >
                                התחברות
                            </Button>
                        </Box>
                    </form>
                </Box>

                {/* Back link */}
                <Box sx={{ textAlign: 'center', mt: 3 }}>
                    <Link to="/" style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>
                        ← חזרה לדף הבית
                    </Link>
                </Box>
            </Box>
        </Box>
    );
}
