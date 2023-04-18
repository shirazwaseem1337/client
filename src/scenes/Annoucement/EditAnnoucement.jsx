import React, { useState, useEffect } from 'react'
import { FormControl, InputLabel, Input, FormGroup, Typography, Button } from '@mui/material';
import styled from '@emotion/styled';
import { getAnnoucement, editAnnoucement } from 'state/api';
import { useNavigate, useParams } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import AddIcon from '@mui/icons-material/Add';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';


const initialValue = {
    name: '',
    textfield: ''
}

const EditAnnoucement = () => {

    const [annoucement, setAnnoucement] = useState(initialValue);
    let navigate = useNavigate();
    const { id } = useParams()

    const loadScholarshipDetails = async () => {
        const response = await getAnnoucement(id)
        setAnnoucement(response.data);     // response mein data ki property huti jis mein response ka data huta

    }

    useEffect(() => {
        loadScholarshipDetails();
    }, []);

    const onValueChange = (e) => {
        console.log(e.target.value, e.target.name)
        setAnnoucement({ ...annoucement, [e.target.name]: e.target.value })  // you can declare let name,value and then [name]:value 
        // object is key value pair but here both key and values are variables so put key in []
    }

    const EditUserDetails = async () => {
        await editAnnoucement(annoucement, id)
        navigate('/annoucement');
    }

    return (
        <Formgroup>
            <Typography variant="h2">Edit annoucement</Typography>

            <FormControl>
                <InputLabel htmlFor="my-input">Title</InputLabel>
                <Input name='name' onChange={(e) => onValueChange(e)} value={annoucement.name} />
            </FormControl>

            <FormControl>


                <TextField
                    name='textfield' onChange={(e) => onValueChange(e)}
                    id="outlined-multiline-static"
                    label="Annoucement"
                    multiline
                    rows={4}
                    defaultValue="Write the annoucement here"
                    value={annoucement.textfield}
                />

            </FormControl>

            <Button sx={{ fontSize: "15px", color: "#665429", margin: "10px 50px", background: "665420" }} variant="outlined" onClick={() => EditUserDetails()}><AddIcon />Edit annoucement</Button>


            <Button sx={{ fontSize: "15px", color: "#665429", background: "665420", margin: "0px 50px" }} variant="outlined" onClick={() => navigate('/annoucement')}><ArrowBackIcon />Back</Button>

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



export default EditAnnoucement