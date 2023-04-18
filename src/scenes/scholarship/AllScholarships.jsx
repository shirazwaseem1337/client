import React, { useState, useEffect } from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import styled from '@emotion/styled';
import { Button } from "@mui/material"
import { NavLink } from "react-router-dom"
import { getScholarships, deleteScholarship } from "../../state/api.js"
import { Box, useTheme } from "@mui/material";
import Header from "components/Header";
import AddIcon from '@mui/icons-material/Add';

const AllUsers = () => {
    const [scholarships, setScholarships] = useState([])
    const getScholarshipData = async () => {
        const response = await getScholarships()
        console.log(response.data)      // gonna store this data in useState array ha tw initially empty array
        setScholarships(response.data)
    }

    useEffect(() => {
        getScholarshipData()
    }, [])


    const deleteScholarshipData = async (id) => {
        await deleteScholarship(id);
        getScholarshipData();
    }

    return (
        <>
            <Box m="1.5rem 2.5rem" >
                <Header
                    title="SCHOLARSHIP DATA"
                    subtitle="View any scholarship here and update it"
                /></Box>

            <Button sx={{ float: "right", fontSize: "15px", color: "#0d696e", margin: "0px 50px" }} component={NavLink} to={`/scholarship/add`}><AddIcon />Add Scholarship</Button>


            <TABLEBODY>
                <TableHead className='tablehead'>
                    <TableCell>Scholarship</TableCell>
                    <TableCell>Type</TableCell>
                    <TableCell>Elgibility</TableCell>
                    <TableCell>End-Date</TableCell>
                    <TableCell></TableCell>


                </TableHead>

                <TableBody>
                    {scholarships.map((currElem) => {
                        return (
                            <TableRow key={scholarships._id} className='tablerow'>
                                <TableCell>{currElem.name}</TableCell>
                                <TableCell>{currElem.type}</TableCell>
                                <TableCell>{currElem.eligible}</TableCell>
                                <TableCell>{currElem.date}</TableCell>

                                <TableCell>
                                    <Button color="primary" variant="contained" style={{ marginRight: 10 }} component={NavLink} to={`/scholarship/edit/${currElem._id}`}>Edit</Button> {/* change it to currElem.id to use JSON Server */}
                                    <Button color="secondary" variant="contained" onClick={() => deleteScholarshipData(currElem._id)}>Delete</Button> {/* change it to user.id to use JSON Server */}
                                </TableCell>

                            </TableRow>
                        )

                    })}


                </TableBody>
            </TABLEBODY>
        </>
    )
}


const TABLEBODY = styled(Table)`
    width: 90%;
    margin: 50px 0 0 50px;

    

    .tablehead{
        & > th {            // table cells inspect mein th ha
        font-size: 18px;
        background: #0d696e;
        color: #FFFFFF;
    }
    }
    
    .tablerow{
        & > td{
        font-size: 15px;
        
    }
    }
`

export default AllUsers