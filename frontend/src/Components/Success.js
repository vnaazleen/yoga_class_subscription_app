import * as React from 'react';
import Alert from '@mui/material/Alert';
import success from '../images/success.png'
import Navbar from './Navbar';

export default function Success() {
    return (
        <>
            <Navbar />
            <div style={{margin:"20% 5%"}}>
                <img src={success} alt="success_img" style={{width:"100px", display: 'block', margin: '0 auto'}}/>
                <Alert severity="success" style={{marginTop: '20px'}}>You have successfully enrolled to Yoga class</Alert>
            </div>
        </>
        
    )
}