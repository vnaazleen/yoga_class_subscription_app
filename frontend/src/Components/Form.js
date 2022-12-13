import * as React from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import {useNavigate} from 'react-router-dom';

import './Form.css';

const batches = [
    {
        value: 1,
        label: "6-7AM"
    },
    {
        value: 2,
        label: "7-8AM"
    },
    {
        value: 3,
        label: "8-9AM"
    },
    {
        value: 4,
        label: "5-6PM"
    },
]

const URL = "http://localhost:3500/makePayment"

const Form = () => {

    const navigate = useNavigate();
    const [batch, setBatch] = React.useState(1)
    const [name, setName] = React.useState('')
    const [age, setAge] = React.useState(18)
    const [validAge, setValidAge] = React.useState(true)
    const [helperText, setHelperText] = React.useState("")
    const [formErrorMessage, setFormErrorMessage] = React.useState("")

    const handleBatchChange = (event) => {
        setBatch(event.target.value)
    };

    const handleNameChange = (event) => {
        setName(event.target.value)
    }

    const handleAgeChange = (event) => {
        console.log(age, event.target.value)
        setAge(event.target.value)
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        console.log(name, age, batch)
        if (age < 18) {
            setFormErrorMessage("You should be atleast 18 years old to join yoga class")
        } else if (age > 65) {
            setFormErrorMessage("You should be less than 65 years old to join yoga class")
        } else {
            axios.post(URL, {
                name: name,
                age: age,
                batch: batch
            }).then((response) => {
                navigate('/success')
            })
        }
    }

    React.useEffect(() => {
        console.log(age)
        if (age < 18 || age > 65) {
            setValidAge(false)
            setHelperText("Sorry, You should be atleast 18 and atmost 65 to join the Yoga Class")
        } else {
            setValidAge(true)
            setHelperText("")
        }
        console.log(validAge, helperText)
    }, [age, validAge, helperText])

    return (
        <div className="Form">
            <Box
             component="form"
             sx={{
               '& .MuiTextField-root': { m: 1, width: '25ch' },
             }}
             autoComplete="off"
             onSubmit={e => handleSubmit(e)}
            >
            <h1 className='heading'>Yoga Class Admission Form</h1>
            <hr className='hline'/>

            <TextField 
                id="name" 
                label="Name" 
                variant="outlined" 
                className="element"
                onChange={handleNameChange}
                required 
            />
            <br/>
            <TextField
                id="age"
                label="Age"
                type="number"
                className="element"
                onChange={handleAgeChange}
                error={!validAge}
                helperText={helperText}
                required
            />
            <br/>
            <TextField
                id="batch"
                select
                label="Batch"
                className="element"
                value={batch}
                onChange={handleBatchChange}
                helperText="Please select a batch"
                >
                {batches.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                    {option.label}
                    </MenuItem>
                ))}
            </TextField>
            <br/>
            <TextField
                id="fee"
                label="Fee"
                type="number"
                value="500"
                className="element"
                disabled
            />
            <br/>
            {
                formErrorMessage
                &&
                <Alert severity="error">{formErrorMessage}</Alert>
            }
            <div className="Submit">
            <Button color="secondary" type="submit" variant="contained">Enroll</Button>
            </div>
            </Box>
        </div>
    );
}

export default Form;