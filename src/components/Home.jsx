import { TextField, Button, Box, Typography } from '@mui/material';
import { Link } from 'react-router-dom';


import '../index.css';

function Home() {
    return (
        <>
            home
            <Link to='/Login'>
                <Button variant="outlined" label="כניסה למערכת" className='buttonLogin'>כניסה</Button>
            </Link>
        </>
    )
}
export default Home;