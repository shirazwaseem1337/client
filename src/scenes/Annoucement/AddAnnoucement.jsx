import React, { useState } from 'react'
import { FormControl, InputLabel, Input, FormGroup, Typography, Button } from '@mui/material';
import styled from '@emotion/styled';
import { addAnnoucement } from "../../state/api";
import { Navigate, useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import AddIcon from '@mui/icons-material/Add';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';


const initialValue = {
    name: '',
    textfield: ''
}

const AddAnnoucement = () => {

    const [annoucement, setAnnoucement] = useState(initialValue);
    let navigate = useNavigate();


    const onValueChange = (e) => {
        console.log(e.target.value, e.target.name)
        setAnnoucement({ ...annoucement, [e.target.name]: e.target.value })  // you can declare let name,value and then [name]:value 
        // object is key value pair but here both key and values are variables so put key in []
    }

    const addUserDetails = async () => {
        await addAnnoucement(annoucement)
        navigate('/annoucement');

    }
    return (
        <Formgroup>
            <Typography variant="h2">Add annoucement</Typography>
            <FormControl>
                <InputLabel htmlFor="my-input">Title</InputLabel>
                <Input name='name' onChange={(e) => onValueChange(e)} />
            </FormControl>

            <FormControl>


                <TextField
                    name='textfield' onChange={(e) => onValueChange(e)}
                    id="outlined-multiline-static"
                    label="Annoucement"
                    multiline
                    rows={4}
                    defaultValue="Write the annoucement here"
                />

            </FormControl>








            <Button sx={{ fontSize: "15px", color: "#665429", margin: "10px 50px", background: "665420" }} onClick={() => addUserDetails()}><AddIcon />Add annoucement</Button>


            <Button sx={{ fontSize: "15px", color: "#665429", background: "665420" }} variant="outlined" onClick={() => navigate('/annoucement')}><ArrowBackIcon />Back</Button>


        </Formgroup>
    )
}


const Formgroup = styled(FormGroup)`
    width: 50%;
    margin: 5% 0 0 25%;
 
    & > div {               // kehne ko form control ha but ha ye div
        margin-top: 20px;
    }
`



export default AddAnnoucement