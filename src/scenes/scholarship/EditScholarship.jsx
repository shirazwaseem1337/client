import React, { useState, useEffect } from 'react'
import { FormControl, InputLabel, Input, FormGroup, Typography, Button } from '@mui/material';
import styled from '@emotion/styled';
import { getScholarship, editScholarship } from 'state/api';
import { useNavigate, useParams } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import AddIcon from '@mui/icons-material/Add';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
const scholarshipDataType = [
    {
        value: 'Merit',
        label: 'Merit Based',
    },
    {
        value: 'Need',
        label: 'Need Based',
    },
    {
        value: 'Both',
        label: 'Both Based',
    },

];

const scholarshipDataEglible = [
    {
        value: 'Pakistani',
        label: 'Pakistani',
    },
    {
        value: 'International',
        label: 'International',
    },

];

const initialValue = {
    name: '',
    type: '',
    eligible: '',
    date: ''
}

const EditUser = () => {

    const [scholarship, setScholarship] = useState(initialValue);
    let navigate = useNavigate();
    const { id } = useParams()

    const loadUserDetails = async () => {
        const response = await getScholarship(id)
        setScholarship(response.data);     // response mein data ki property huti jis mein response ka data huta

    }

    useEffect(() => {
        loadUserDetails();
    }, []);

    const onValueChange = (e) => {
        console.log(e.target.value, e.target.name)
        setScholarship({ ...scholarship, [e.target.name]: e.target.value })  // you can declare let name,value and then [name]:value 
        // object is key value pair but here both key and values are variables so put key in []
    }

    const EditUserDetails = async () => {
        await editScholarship(scholarship, id)
        navigate('/scholarship');
    }

    return (
        <Formgroup>
            <Typography variant="h2">Edit Scholarship</Typography>
            <FormControl>
                <InputLabel htmlFor="my-input">Name of scholarship</InputLabel>
                <Input name='name' value={scholarship.name} onChange={(e) => onValueChange(e)} />
            </FormControl>

            <FormControl>
                <TextField
                    id="outlined-select-currency"
                    select
                    label="Select Type"
                    name='type'
                    value={scholarship.type}
                    onChange={(e) => { onValueChange(e) }}

                // defaultValue="EUR"
                // helperText="Please select your currency"
                >
                    {scholarshipDataType.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))}
                </TextField>
            </FormControl>

            <FormControl>
                <TextField
                    id="outlined-select-currency"
                    select
                    label="Select Eligiblilty"
                    name='eligible'
                    value={scholarship.eligible}
                    onChange={(e) => { onValueChange(e) }}

                // defaultValue="EUR"
                // helperText="Please select your currency"
                >
                    {scholarshipDataEglible.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))}
                </TextField>
            </FormControl>

            <FormControl>
                <TextField
                    id="outlined-number"
                    label="Ending Date"
                    type="date"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    name='date'
                    value={scholarship.date}
                    onChange={(e) => onValueChange(e)}
                />

            </FormControl>


            <Button sx={{ fontSize: "15px", color: "#665429", margin: "10px 50px", background: "665420" }} variant="outlined" onClick={() => EditUserDetails()}><AddIcon />Edit Scholarship</Button>


            <Button sx={{ fontSize: "15px", color: "#665429", background: "665420", margin: "0px 50px" }} variant="outlined" onClick={() => navigate('/scholarship')}><ArrowBackIcon />Back</Button>

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



export default EditUser