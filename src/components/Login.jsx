import React from 'react';
import { useForm } from 'react-hook-form'; // יעבוד רק אחרי ה-npm install
import { TextField, Button, Box, Typography } from '@mui/material'; // הפתרון ל-is not defined
import { useDispatch } from 'react-redux';
import { setLogin } from '../Store/userSlice';
import { Link, useNavigate } from 'react-router-dom';

export default function Login() {
    const { register, handleSubmit } = useForm()
    const dispatch = useDispatch(); // יצירת פונקציית השליחה
    const navigate=useNavigate();
const onSubmit = (data) => {
    // יוצרים אובייקט חדש שמכיל הכל + id
    const userWithId = { 
        ...data, 
        id: data.password 
    };
    
    // שליחת האובייקט המעודכן!
    dispatch(setLogin(userWithId)); 
    navigate('/AllProject');
};

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <TextField id="filled-basic-userName" label="שם משתשמש" variant="filled"{...register("userName", { required: true, maxLength: 20 })} />
            <TextField id="filled-basic-email" label="מייל" variant="filled" {...register("email", { pattern:  /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                message: "כתובת מייל לא תקינה"})} />
            <TextField id="filled-basic-password" label="סיסמא" variant="filled" {...register("password", { minLength: { value: 6, message: "הסיסמה חייבת להכיל לפחות 6 תווים" } })} />
            <Button type='submit' variant="outlined">התחברות</Button>
        </form>
    )
}